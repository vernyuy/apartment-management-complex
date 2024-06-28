"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = exports.request = void 0;
function request(ctx) {
    // add timestamps
    const item = ctx.args;
    const pk = `APARTMENT#${item.apartmentId}`;
    const sk = 'BOOKING#';
    return {
        operation: "Query",
        query: {
            expression: 'PK = :pk and begins_with(SK, :sk)',
            expressionValues: {
                ":pk": pk,
                ":sk": sk
            }
        }
    };
}
exports.request = request;
function response(ctx) {
    return ctx.result;
}
exports.response = response;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QWxsQm9va2luZ1BlckFwYXJ0bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEFsbEJvb2tpbmdQZXJBcGFydG1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBTUEsU0FBZ0IsT0FBTyxDQUNyQixHQUFpRDtJQUVqRCxpQkFBaUI7SUFDakIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUssQ0FBQztJQUN2QixNQUFNLEVBQUUsR0FBRyxhQUFhLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUMxQyxNQUFNLEVBQUUsR0FBRyxVQUFVLENBQUE7SUFFckIsT0FBTztRQUNMLFNBQVMsRUFBRSxPQUFPO1FBQ2xCLEtBQUssRUFBRTtZQUNILFVBQVUsRUFBRSxtQ0FBbUM7WUFDL0MsZ0JBQWdCLEVBQUU7Z0JBQ2QsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLEVBQUU7YUFDWjtTQUNKO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFsQkQsMEJBa0JDO0FBRUQsU0FBZ0IsUUFBUSxDQUN0QixHQU1DO0lBRUQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQ3BCLENBQUM7QUFWRCw0QkFVQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRleHQsIER5bmFtb0RCUXVlcnlSZXF1ZXN0IH0gZnJvbSBcIkBhd3MtYXBwc3luYy91dGlsc1wiO1xuaW1wb3J0IHtcbiAgUXVlcnlHZXRBbGxCb29raW5nc1BlckFwYXJ0bWVudEFyZ3MsXG4gIEJvb2tpbmcsXG59IGZyb20gXCIuLi8uLi90eXBlcy9hcHBzeW5jXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0KFxuICBjdHg6IENvbnRleHQ8UXVlcnlHZXRBbGxCb29raW5nc1BlckFwYXJ0bWVudEFyZ3M+XG4pOiBEeW5hbW9EQlF1ZXJ5UmVxdWVzdCB7XG4gIC8vIGFkZCB0aW1lc3RhbXBzXG4gIGNvbnN0IGl0ZW0gPSBjdHguYXJncyE7XG4gIGNvbnN0IHBrID0gYEFQQVJUTUVOVCMke2l0ZW0uYXBhcnRtZW50SWR9YFxuICBjb25zdCBzayA9ICdCT09LSU5HIydcblxuICByZXR1cm4ge1xuICAgIG9wZXJhdGlvbjogXCJRdWVyeVwiLFxuICAgIHF1ZXJ5OiB7XG4gICAgICAgIGV4cHJlc3Npb246ICdQSyA9IDpwayBhbmQgYmVnaW5zX3dpdGgoU0ssIDpzayknLFxuICAgICAgICBleHByZXNzaW9uVmFsdWVzOiB7XG4gICAgICAgICAgICBcIjpwa1wiOiBwayxcbiAgICAgICAgICAgIFwiOnNrXCI6IHNrXG4gICAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNwb25zZShcbiAgY3R4OiBDb250ZXh0PFxuICBRdWVyeUdldEFsbEJvb2tpbmdzUGVyQXBhcnRtZW50QXJncyxcbiAgICBvYmplY3QsXG4gICAgb2JqZWN0LFxuICAgIG9iamVjdCxcbiAgICBCb29raW5nXG4gID5cbikge1xuICByZXR1cm4gY3R4LnJlc3VsdDtcbn1cbiJdfQ==