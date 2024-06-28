"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    overwrite: true,
    schema: [
        'schema/schema.graphql',
        `
scalar AWSDate
scalar AWSTime
scalar AWSDateTime
scalar AWSTimestamp
scalar AWSEmail
scalar AWSJSON
scalar AWSURL
scalar AWSPhone
scalar AWSIPAddress
`,
    ],
    config: {
        scalars: {
            AWSJSON: 'string',
            AWSDate: 'string',
            AWSTime: 'string',
            AWSDateTime: 'string',
            AWSTimestamp: 'number',
            AWSEmail: 'string',
            AWSURL: 'string',
            AWSPhone: 'string',
            AWSIPAddress: 'string',
        },
    },
    generates: {
        'src/types/appsync.ts': {
            plugins: ['typescript'],
        },
    },
};
exports.default = config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZWdlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvZGVnZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxNQUFNLE1BQU0sR0FBa0I7SUFDNUIsU0FBUyxFQUFFLElBQUk7SUFDZixNQUFNLEVBQUU7UUFDTix1QkFBdUI7UUFDdkI7Ozs7Ozs7Ozs7Q0FVSDtLQUNFO0lBQ0QsTUFBTSxFQUFFO1FBQ04sT0FBTyxFQUFFO1lBQ1AsT0FBTyxFQUFFLFFBQVE7WUFDakIsT0FBTyxFQUFFLFFBQVE7WUFDakIsT0FBTyxFQUFFLFFBQVE7WUFDakIsV0FBVyxFQUFFLFFBQVE7WUFDckIsWUFBWSxFQUFFLFFBQVE7WUFDdEIsUUFBUSxFQUFFLFFBQVE7WUFDbEIsTUFBTSxFQUFFLFFBQVE7WUFDaEIsUUFBUSxFQUFFLFFBQVE7WUFDbEIsWUFBWSxFQUFFLFFBQVE7U0FDdkI7S0FDRjtJQUNELFNBQVMsRUFBRTtRQUNULHNCQUFzQixFQUFFO1lBQ3RCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztTQUN4QjtLQUNGO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvZGVnZW5Db25maWcgfSBmcm9tICdAZ3JhcGhxbC1jb2RlZ2VuL2NsaSc7XG5cbmNvbnN0IGNvbmZpZzogQ29kZWdlbkNvbmZpZyA9IHtcbiAgb3ZlcndyaXRlOiB0cnVlLFxuICBzY2hlbWE6IFtcbiAgICAnc2NoZW1hL3NjaGVtYS5ncmFwaHFsJyxcbiAgICBgXG5zY2FsYXIgQVdTRGF0ZVxuc2NhbGFyIEFXU1RpbWVcbnNjYWxhciBBV1NEYXRlVGltZVxuc2NhbGFyIEFXU1RpbWVzdGFtcFxuc2NhbGFyIEFXU0VtYWlsXG5zY2FsYXIgQVdTSlNPTlxuc2NhbGFyIEFXU1VSTFxuc2NhbGFyIEFXU1Bob25lXG5zY2FsYXIgQVdTSVBBZGRyZXNzXG5gLFxuICBdLFxuICBjb25maWc6IHtcbiAgICBzY2FsYXJzOiB7XG4gICAgICBBV1NKU09OOiAnc3RyaW5nJyxcbiAgICAgIEFXU0RhdGU6ICdzdHJpbmcnLFxuICAgICAgQVdTVGltZTogJ3N0cmluZycsXG4gICAgICBBV1NEYXRlVGltZTogJ3N0cmluZycsXG4gICAgICBBV1NUaW1lc3RhbXA6ICdudW1iZXInLFxuICAgICAgQVdTRW1haWw6ICdzdHJpbmcnLFxuICAgICAgQVdTVVJMOiAnc3RyaW5nJyxcbiAgICAgIEFXU1Bob25lOiAnc3RyaW5nJyxcbiAgICAgIEFXU0lQQWRkcmVzczogJ3N0cmluZycsXG4gICAgfSxcbiAgfSxcbiAgZ2VuZXJhdGVzOiB7XG4gICAgJ3NyYy90eXBlcy9hcHBzeW5jLnRzJzoge1xuICAgICAgcGx1Z2luczogWyd0eXBlc2NyaXB0J10sXG4gICAgfSxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZzsiXX0=