"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = exports.request = void 0;
const utils_1 = require("@aws-appsync/utils");
const helpers_1 = require("../../lib/helpers");
function request(ctx) {
    // add timestamps
    const item = (0, helpers_1.createItem)(ctx.args.input);
    return {
        operation: "PutItem",
        key: utils_1.util.dynamodb.toMapValues({
            PK: `BUILDING#${item.buildingId}`,
            SK: `APARTMENT#${utils_1.util.autoId()}`,
        }),
        attributeValues: utils_1.util.dynamodb.toMapValues({
            publishDate: utils_1.util.time.nowISO8601(),
            ENTITY: "APARTMENT",
            ...item,
        }),
    };
}
exports.request = request;
function response(ctx) {
    return ctx.result;
}
exports.response = response;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlQXBhcnRtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3JlYXRlQXBhcnRtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUEyRTtBQUMzRSwrQ0FBK0M7QUFHL0MsU0FBZ0IsT0FBTyxDQUNyQixHQUF5QztJQUV6QyxpQkFBaUI7SUFDakIsTUFBTSxJQUFJLEdBQUcsSUFBQSxvQkFBVSxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBTSxDQUFDLENBQUM7SUFFekMsT0FBTztRQUNMLFNBQVMsRUFBRSxTQUFTO1FBQ3BCLEdBQUcsRUFBRSxZQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUM3QixFQUFFLEVBQUUsWUFBWSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pDLEVBQUUsRUFBRSxhQUFhLFlBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtTQUNqQyxDQUFDO1FBQ0YsZUFBZSxFQUFFLFlBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQ3pDLFdBQVcsRUFBRSxZQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQyxNQUFNLEVBQUUsV0FBVztZQUNuQixHQUFHLElBQUk7U0FDUixDQUFDO0tBQ0gsQ0FBQztBQUNKLENBQUM7QUFsQkQsMEJBa0JDO0FBRUQsU0FBZ0IsUUFBUSxDQUN0QixHQUE0RTtJQUU1RSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDcEIsQ0FBQztBQUpELDRCQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udGV4dCwgRHluYW1vREJQdXRJdGVtUmVxdWVzdCwgdXRpbCB9IGZyb20gXCJAYXdzLWFwcHN5bmMvdXRpbHNcIjtcbmltcG9ydCB7IGNyZWF0ZUl0ZW0gfSBmcm9tIFwiLi4vLi4vbGliL2hlbHBlcnNcIjtcbmltcG9ydCB7IE11dGF0aW9uQ3JlYXRlQXBhcnRtZW50QXJncywgQXBhcnRtZW50IH0gZnJvbSBcIi4uLy4uL3R5cGVzL2FwcHN5bmNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3QoXG4gIGN0eDogQ29udGV4dDxNdXRhdGlvbkNyZWF0ZUFwYXJ0bWVudEFyZ3M+LFxuKTogRHluYW1vREJQdXRJdGVtUmVxdWVzdCB7XG4gIC8vIGFkZCB0aW1lc3RhbXBzXG4gIGNvbnN0IGl0ZW0gPSBjcmVhdGVJdGVtKGN0eC5hcmdzLmlucHV0ISk7XG5cbiAgcmV0dXJuIHtcbiAgICBvcGVyYXRpb246IFwiUHV0SXRlbVwiLFxuICAgIGtleTogdXRpbC5keW5hbW9kYi50b01hcFZhbHVlcyh7XG4gICAgICBQSzogYEJVSUxESU5HIyR7aXRlbS5idWlsZGluZ0lkfWAsXG4gICAgICBTSzogYEFQQVJUTUVOVCMke3V0aWwuYXV0b0lkKCl9YCxcbiAgICB9KSxcbiAgICBhdHRyaWJ1dGVWYWx1ZXM6IHV0aWwuZHluYW1vZGIudG9NYXBWYWx1ZXMoe1xuICAgICAgcHVibGlzaERhdGU6IHV0aWwudGltZS5ub3dJU084NjAxKCksXG4gICAgICBFTlRJVFk6IFwiQVBBUlRNRU5UXCIsXG4gICAgICAuLi5pdGVtLFxuICAgIH0pLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzcG9uc2UoXG4gIGN0eDogQ29udGV4dDxNdXRhdGlvbkNyZWF0ZUFwYXJ0bWVudEFyZ3MsIG9iamVjdCwgb2JqZWN0LCBvYmplY3QsIEFwYXJ0bWVudD4sXG4pIHtcbiAgcmV0dXJuIGN0eC5yZXN1bHQ7XG59XG4iXX0=