#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from pathlib import Path
import pandas as pd
import re
import json

# ===== 配置 =====
HTML_IN  = Path("scatter-weight.html")             # 输入 HTML
CSV_IN   = Path("intersections_flow_speed.csv")    # 输入 CSV
HTML_OUT = Path("scatter-weight.replaced.html")    # 输出 HTML
LINE_HINT = 132                                     # 从第 132 行起搜索 data: [
# 三列列名：X、Y、Z（大小写/空格/下划线都做容错）
X_COL_NAME = "Bus_Flow(veh/h)"
Y_COL_NAME = "Avg_Speed(km/h)"
Z_COL_NAME = "Intersection_ID"   # 例：可改成你 CSV 的第三列名（也可为数值列）
GROUPS_PER_LINE = 10
INDENT = "  "
# ===============

def _normalize(s: str) -> str:
    return re.sub(r"[\s_]+", "", s.strip().lower())

def _resolve_col(df: pd.DataFrame, want: str) -> str:
    # 1) 直接大小写匹配
    for c in df.columns:
        if c.lower() == want.lower():
            return c
    # 2) 忽略空格/下划线匹配
    want_n = _normalize(want)
    for c in df.columns:
        if _normalize(c) == want_n:
            return c
    raise KeyError(f"CSV 中找不到列：{want}；实际列为：{list(df.columns)}")

def _format_js_value_keep_1_decimal_if_number(v):
    # 数值 -> 保留 1 位小数；其他类型 -> 合法 JS 字面量（字符串会带引号）
    try:
        f = float(v)
        if pd.isna(f):
            return "null"
        return f"{f:.1f}"
    except Exception:
        return json.dumps(v, ensure_ascii=False)

def _load_triplets(csv_path: Path, x_name: str, y_name: str, z_name: str):
    df = pd.read_csv(csv_path)
    xcol = _resolve_col(df, x_name)
    ycol = _resolve_col(df, y_name)
    zcol = _resolve_col(df, z_name)
    df2 = df[[xcol, ycol, zcol]].dropna()

    triplet_strs = []
    for _, row in df2.iterrows():
        x_s = _format_js_value_keep_1_decimal_if_number(row[xcol])
        y_s = _format_js_value_keep_1_decimal_if_number(row[ycol])
        z_s = _format_js_value_keep_1_decimal_if_number(row[zcol])
        triplet_strs.append(f"[{x_s}, {y_s}, {z_s}]")
    return triplet_strs

def _find_data_array_bounds(text: str, start_offset: int):
    """
    从 start_offset 开始寻找 'data: ['，
    返回 (open_bracket_idx, close_bracket_idx+1)，使 text[open:close] 为完整 [ ... ]。
    """
    m = re.search(r"data\s*:\s*\[", text[start_offset:], re.IGNORECASE)
    if not m:
        # 兜底：从头搜
        m = re.search(r"data\s*:\s*\[", text, re.IGNORECASE)
        if not m:
            raise ValueError("未找到 'data: ['。")
        open_bracket = m.end() - 1
    else:
        open_bracket = start_offset + m.end() - 1

    depth = 0
    i = open_bracket
    while i < len(text):
        ch = text[i]
        if ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                return open_bracket, i + 1
        i += 1
    raise ValueError("没有匹配到 data 数组的闭合 ']'。")

def main():
    html = HTML_IN.read_text(encoding="utf-8")

    # 计算“第 132 行”在文本中的偏移
    lines = html.splitlines(keepends=True)
    hint_offset = sum(len(l) for l in lines[:max(0, min(len(lines), LINE_HINT) - 1)])

    open_idx, close_idx = _find_data_array_bounds(html, hint_offset)

    # 三维数组：每行 10 组
    triplet_strs = _load_triplets(CSV_IN, X_COL_NAME, Y_COL_NAME, Z_COL_NAME)
    chunks = [", ".join(triplet_strs[i:i+GROUPS_PER_LINE]) for i in range(0, len(triplet_strs), GROUPS_PER_LINE)]
    pretty_array = "[\n" + INDENT + (",\n" + INDENT).join(chunks) + "\n]"

    # 替换 [ ... ]，保留前缀 data:
    new_html = html[:open_idx] + pretty_array + html[close_idx:]
    HTML_OUT.write_text(new_html, encoding="utf-8")

    print(f"✅ 已替换 {HTML_IN} 的 scatter data 为三维数组（每行 {GROUPS_PER_LINE} 组）。")
    print(f"→ 输出：{HTML_OUT}")
    print(f"→ 写入条数：{len(triplet_strs)}，行数：{len(chunks)}")

if __name__ == "__main__":
    import re
    main()
