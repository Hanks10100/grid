
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

// 根据边界集合计算下一个起点的坐标
function getOrigin(boundary) {
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;

    boundary.forEach(point => {
        if (point.y < minY) {
            minX = point.x;
            minY = point.y;
        } else if (point.y === minY) {
            minX = (point.x < minX) ? point.x : minX;
        }
    });

    return { x: minX, y: minY };
}

// =========================================================
//  计算每个图形应该摆放的起始位置
//  @param 1: 网格横向总宽度
//  @param 2: 由每个图形的宽高构成的数组 [{x:*,y:*},...]
//  返回值: 每个图形应该摆放的起始位置所构成的数组
// =========================================================
function computePosition(gridWidth, boxes) {
    const record = [{ x: 0, y: 0 }];       // 初始化所有格子的起点记录

    // 初始化起点和底部边界线
    let origin = { x: 0, y: 0 };
    let boundary = [origin, { x: gridWidth, y: 0 }];

    boxes.forEach(box => {

        // 计算新的 boundary
        boundary = xor(boundary, [
            move(origin, 0, 0),
            move(origin, box.x, 0),
            move(origin, 0, box.y),
            move(origin, box.x, box.y)
        ]);

        // 计算下一个起点的位置
        origin = getOrigin(boundary);

        record.push(origin);
    });

    return record;
}

module.exports = {
    isEqual,
    xor,
    computePosition,
}
