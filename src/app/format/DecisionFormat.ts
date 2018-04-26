export const decisionFormat = function (value: string): string {
  let _map = {
    Accept: "通过",
    Review: "复核",
    Reject: "拒绝"
  };
  let val = _map[value];
  return val ? val : "无法解析";
};
