import { TreeNode } from "@/types/tree";

export const initialTree: TreeNode[] = [
  {
    id: "1",
    label: "دارایی‌های جاری",
    children: [
      {
        id: "1-1",
        label: "موجودی نقد",
        children: [],
      },
      {
        id: "1-2",
        label: "بانک",
        children: [],
      },
      {
        id: "1-3",
        label: "اسناد دریافتنی",
        children: [
          {
            id: "1-3-1",
            label: "چک‌های دریافتنی",
            children: [],
          },
          {
            id: "1-3-2",
            label: "سایر اسناد",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    label: "دارایی‌های غیر جاری",
    children: [
      {
        id: "2-1",
        label: "دارایی‌های ثابت",
        children: [],
      },
      {
        id: "2-2",
        label: "سرمایه‌گذاری‌ها",
        children: [],
      },
    ],
  },
];