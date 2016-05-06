
// 判断两点是否相等
function isEqual(pa, pb) {
    return pa.x === pb.x && pa.y === pb.y;
}

// 移动点的位置
function move(point, x = 0, y = 0) {
    return { x: point.x + x, y: point.y + y };
}

// 求集合对称差，参考公式：AΔB = (A - B)∪(B - A)
function xor(A, B) {
    return []
        .concat(A.filter(a => B.every(b => !isEqual(a, b))))
        .concat(B.filter(b => A.every(a => !isEqual(a, b))))
}

function computePosition(gridWidth, boxes) {
}

module.exports = {
    isEqual,
    xor,
    computePosition,
}
