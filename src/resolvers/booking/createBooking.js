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
            PK: `APARTMENT#${item.apartmentId}`,
            SK: `BOOKING#${utils_1.util.autoId()}`,
        }),
        attributeValues: utils_1.util.dynamodb.toMapValues({
            GSI1PK: `USER#${item.userId}`,
            GSI1SK: `APARTMENT#${item.apartmentId}`,
            ENTITY: "BOOKING",
            publishDate: utils_1.util.time.nowISO8601(),
            ...item,
        }),
    };
}
exports.request = request;
function response(ctx) {
    return ctx.result;
}
exports.response = response;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlQm9va2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyZWF0ZUJvb2tpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOENBQTJFO0FBQzNFLCtDQUErQztBQU0vQyxTQUFnQixPQUFPLENBQ3JCLEdBQWdEO0lBRWhELGlCQUFpQjtJQUNqQixNQUFNLElBQUksR0FBRyxJQUFBLG9CQUFVLEVBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFNLENBQUMsQ0FBQztJQUV6QyxPQUFPO1FBQ0wsU0FBUyxFQUFFLFNBQVM7UUFDcEIsR0FBRyxFQUFFLFlBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQzdCLEVBQUUsRUFBRSxhQUFhLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkMsRUFBRSxFQUFFLFdBQVcsWUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO1NBQy9CLENBQUM7UUFDRixlQUFlLEVBQUUsWUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7WUFDekMsTUFBTSxFQUFFLFFBQVEsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUM3QixNQUFNLEVBQUUsYUFBYSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3ZDLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLFdBQVcsRUFBRSxZQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQyxHQUFHLElBQUk7U0FDUixDQUFDO0tBQ0gsQ0FBQztBQUNKLENBQUM7QUFwQkQsMEJBb0JDO0FBRUQsU0FBZ0IsUUFBUSxDQUN0QixHQU1DO0lBRUQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQ3BCLENBQUM7QUFWRCw0QkFVQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRleHQsIER5bmFtb0RCUHV0SXRlbVJlcXVlc3QsIHV0aWwgfSBmcm9tIFwiQGF3cy1hcHBzeW5jL3V0aWxzXCI7XG5pbXBvcnQgeyBjcmVhdGVJdGVtIH0gZnJvbSBcIi4uLy4uL2xpYi9oZWxwZXJzXCI7XG5pbXBvcnQge1xuICBNdXRhdGlvbkNyZWF0ZUFwYXJ0bWVudEJvb2tpbmdBcmdzLFxuICBCb29raW5nLFxufSBmcm9tIFwiLi4vLi4vdHlwZXMvYXBwc3luY1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdChcbiAgY3R4OiBDb250ZXh0PE11dGF0aW9uQ3JlYXRlQXBhcnRtZW50Qm9va2luZ0FyZ3M+XG4pOiBEeW5hbW9EQlB1dEl0ZW1SZXF1ZXN0IHtcbiAgLy8gYWRkIHRpbWVzdGFtcHNcbiAgY29uc3QgaXRlbSA9IGNyZWF0ZUl0ZW0oY3R4LmFyZ3MuaW5wdXQhKTtcblxuICByZXR1cm4ge1xuICAgIG9wZXJhdGlvbjogXCJQdXRJdGVtXCIsXG4gICAga2V5OiB1dGlsLmR5bmFtb2RiLnRvTWFwVmFsdWVzKHtcbiAgICAgIFBLOiBgQVBBUlRNRU5UIyR7aXRlbS5hcGFydG1lbnRJZH1gLFxuICAgICAgU0s6IGBCT09LSU5HIyR7dXRpbC5hdXRvSWQoKX1gLFxuICAgIH0pLFxuICAgIGF0dHJpYnV0ZVZhbHVlczogdXRpbC5keW5hbW9kYi50b01hcFZhbHVlcyh7XG4gICAgICBHU0kxUEs6IGBVU0VSIyR7aXRlbS51c2VySWR9YCxcbiAgICAgIEdTSTFTSzogYEFQQVJUTUVOVCMke2l0ZW0uYXBhcnRtZW50SWR9YCxcbiAgICAgIEVOVElUWTogXCJCT09LSU5HXCIsXG4gICAgICBwdWJsaXNoRGF0ZTogdXRpbC50aW1lLm5vd0lTTzg2MDEoKSxcbiAgICAgIC4uLml0ZW0sXG4gICAgfSksXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNwb25zZShcbiAgY3R4OiBDb250ZXh0PFxuICAgIE11dGF0aW9uQ3JlYXRlQXBhcnRtZW50Qm9va2luZ0FyZ3MsXG4gICAgb2JqZWN0LFxuICAgIG9iamVjdCxcbiAgICBvYmplY3QsXG4gICAgQm9va2luZ1xuICA+XG4pIHtcbiAgcmV0dXJuIGN0eC5yZXN1bHQ7XG59XG4iXX0=