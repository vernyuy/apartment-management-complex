"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = exports.request = void 0;
function request(ctx) {
    // add timestamps
    const id = ctx.args.apartmentId;
    const pk = `APARTMENT#${id}`;
    const sk = `FEEDBACK#`;
    return {
        operation: 'Query',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QXBhcnRtZW50RmVlZGJhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRBcGFydG1lbnRGZWVkYmFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxTQUFnQixPQUFPLENBQ3JCLEdBQTJDO0lBRTNDLGlCQUFpQjtJQUNqQixNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUNoQyxNQUFNLEVBQUUsR0FBRyxhQUFhLEVBQUUsRUFBRSxDQUFDO0lBRTdCLE1BQU0sRUFBRSxHQUFHLFdBQVcsQ0FBQztJQUV2QixPQUFPO1FBQ0wsU0FBUyxFQUFFLE9BQU87UUFDbEIsS0FBSyxFQUFFO1lBQ0gsVUFBVSxFQUFFLG1DQUFtQztZQUMvQyxnQkFBZ0IsRUFBRTtnQkFDZCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxLQUFLLEVBQUUsRUFBRTthQUNaO1NBQ0o7S0FDRixDQUFDO0FBQ0osQ0FBQztBQW5CRCwwQkFtQkM7QUFFRCxTQUFnQixRQUFRLENBQ3RCLEdBQXVGO0lBRXZGLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUNwQixDQUFDO0FBSkQsNEJBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250ZXh0LCBEeW5hbW9EQlF1ZXJ5UmVxdWVzdCB9IGZyb20gJ0Bhd3MtYXBwc3luYy91dGlscyc7XG5pbXBvcnQgeyBRdWVyeUdldEFwYXJ0bWVudEZlZWRiYWNrQXJncywgUmF0aW5nc0FuZEZlZWRiYWNrIH0gZnJvbSAnLi4vLi4vdHlwZXMvYXBwc3luYyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0KFxuICBjdHg6IENvbnRleHQ8UXVlcnlHZXRBcGFydG1lbnRGZWVkYmFja0FyZ3M+LFxuKTogRHluYW1vREJRdWVyeVJlcXVlc3Qge1xuICAvLyBhZGQgdGltZXN0YW1wc1xuICBjb25zdCBpZCA9IGN0eC5hcmdzLmFwYXJ0bWVudElkO1xuICBjb25zdCBwayA9IGBBUEFSVE1FTlQjJHtpZH1gO1xuXG4gIGNvbnN0IHNrID0gYEZFRURCQUNLI2A7XG5cbiAgcmV0dXJuIHtcbiAgICBvcGVyYXRpb246ICdRdWVyeScsXG4gICAgcXVlcnk6IHtcbiAgICAgICAgZXhwcmVzc2lvbjogJ1BLID0gOnBrIGFuZCBiZWdpbnNfd2l0aChTSywgOnNrKScsXG4gICAgICAgIGV4cHJlc3Npb25WYWx1ZXM6IHtcbiAgICAgICAgICAgIFwiOnBrXCI6IHBrLFxuICAgICAgICAgICAgXCI6c2tcIjogc2tcbiAgICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3BvbnNlKFxuICBjdHg6IENvbnRleHQ8UXVlcnlHZXRBcGFydG1lbnRGZWVkYmFja0FyZ3MsIG9iamVjdCwgb2JqZWN0LCBvYmplY3QsIFJhdGluZ3NBbmRGZWVkYmFjaz4sXG4pIHtcbiAgcmV0dXJuIGN0eC5yZXN1bHQ7XG59Il19