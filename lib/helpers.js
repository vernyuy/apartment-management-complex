"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundleAppSyncResolver = void 0;
const aws_appsync_1 = require("aws-cdk-lib/aws-appsync");
const esbuild = require("esbuild");
const bundleAppSyncResolver = (entryPoint) => {
    const result = esbuild.buildSync({
        entryPoints: [entryPoint],
        external: ['@aws-appsync/utils'],
        bundle: true,
        write: false,
        platform: 'node',
        target: 'esnext',
        format: 'esm',
        sourcemap: 'inline',
        sourcesContent: false,
    });
    return aws_appsync_1.Code.fromInline(result.outputFiles[0].text);
};
exports.bundleAppSyncResolver = bundleAppSyncResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseURBQStDO0FBQy9DLG1DQUFtQztBQUU1QixNQUFNLHFCQUFxQixHQUFHLENBQUMsVUFBa0IsRUFBUSxFQUFFO0lBQ2hFLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDL0IsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQ3pCLFFBQVEsRUFBRSxDQUFDLG9CQUFvQixDQUFDO1FBQ2hDLE1BQU0sRUFBRSxJQUFJO1FBQ1osS0FBSyxFQUFFLEtBQUs7UUFDWixRQUFRLEVBQUUsTUFBTTtRQUNoQixNQUFNLEVBQUUsUUFBUTtRQUNoQixNQUFNLEVBQUUsS0FBSztRQUNiLFNBQVMsRUFBRSxRQUFRO1FBQ25CLGNBQWMsRUFBRSxLQUFLO0tBQ3RCLENBQUMsQ0FBQztJQUVILE9BQU8sa0JBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyRCxDQUFDLENBQUM7QUFkVyxRQUFBLHFCQUFxQix5QkFjaEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2RlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWFwcHN5bmMnO1xuaW1wb3J0ICogYXMgZXNidWlsZCBmcm9tICdlc2J1aWxkJztcblxuZXhwb3J0IGNvbnN0IGJ1bmRsZUFwcFN5bmNSZXNvbHZlciA9IChlbnRyeVBvaW50OiBzdHJpbmcpOiBDb2RlID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gZXNidWlsZC5idWlsZFN5bmMoe1xuICAgIGVudHJ5UG9pbnRzOiBbZW50cnlQb2ludF0sXG4gICAgZXh0ZXJuYWw6IFsnQGF3cy1hcHBzeW5jL3V0aWxzJ10sXG4gICAgYnVuZGxlOiB0cnVlLFxuICAgIHdyaXRlOiBmYWxzZSxcbiAgICBwbGF0Zm9ybTogJ25vZGUnLFxuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgZm9ybWF0OiAnZXNtJyxcbiAgICBzb3VyY2VtYXA6ICdpbmxpbmUnLFxuICAgIHNvdXJjZXNDb250ZW50OiBmYWxzZSxcbiAgfSk7XG5cbiAgcmV0dXJuIENvZGUuZnJvbUlubGluZShyZXN1bHQub3V0cHV0RmlsZXNbMF0udGV4dCk7XG59OyJdfQ==