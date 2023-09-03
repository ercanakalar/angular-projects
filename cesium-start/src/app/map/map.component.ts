import { Component, OnInit } from '@angular/core';
declare var Cesium: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {
  viewer: any;

  ngOnInit() {
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMjg5MWYyNS1jMTY5LTQzNjctOGVjNi0yODRiNGU4OGRmYzAiLCJpZCI6MTUwMDcwLCJpYXQiOjE2ODc5ODEwMzl9.NKFky9aBWGyFqyD8_ZFnM7sDBGS0hnmjhHbfR4QworI';
    const terrainProvider = new Cesium.CesiumTerrainProvider({
      url: Cesium.IonResource.fromAssetId(1),
      requestWaterMask: true,
      requestVertexNormals: true,
    });

    this.viewer = new Cesium.Viewer('cesiumContainer', {
      terrainProvider: terrainProvider,
    });

    this.viewer.scene.globe.depthTestAgainstTerrain = true;

    this.viewer.screenSpaceEventHandler.setInputAction(
      this.handleRightClickEvent.bind(this),
      Cesium.ScreenSpaceEventType.RIGHT_CLICK
    );
  }

  handleRightClickEvent(event: any) {
    const ray = this.viewer.camera.getPickRay(event.position);
    const position = this.viewer.scene.pickPosition(event.position);
    console.log(position, 'position');

    if (Cesium.defined(position)) {
      Cesium.sampleTerrainMostDetailed(
        this.viewer.terrainProvider,
        [position],
        12
      )
        .then((samples: any) => {
          const cartographic = Cesium.Cartographic.fromCartesian(position);
          console.log(cartographic, 'cartographic');
          const altitude = cartographic.height;

          const longitude = Cesium.Math.toDegrees(cartographic.longitude);
          const latitude = Cesium.Math.toDegrees(cartographic.latitude);

          this.viewer.entities.add({
            position: position,
            billboard: {
              image: 'assets/location.png', // Replace with the path to your marker icon image
              width: 12,
              height: 12,
            },
          });

          const altitudeMSL = altitude;

          if (isNaN(altitudeMSL)) {
            console.log(
              'Failed to calculate altitude MSL. Terrain data may be unavailable.'
            );
          } else {
            console.log('Picked position:', longitude, latitude, altitudeMSL);
          }
        })
        .catch((error: any) => {
          console.log('Failed to sample terrain:', error);
        });
    }
  }
}

// import { Component, OnInit, AfterViewInit } from '@angular/core';

// declare var Cesium: any;

// @Component({
//   selector: 'app-map',
//   templateUrl: './map.component.html',
// })
// export class MapComponent implements OnInit {
//   viewer = Cesium.Viewer;
//   constructor() {}

//   ngOnInit() {
//     this.viewer = new Cesium.Viewer('cesiumContainer');
//     this.viewer.scene.globe.depthTestAgainstTerrain = true;

//     this.viewer.screenSpaceEventHandler.setInputAction(
//       this.handleRightClickEvent.bind(this),
//       Cesium.ScreenSpaceEventType.RIGHT_CLICK
//     );
//   }

//   handleRightClickEvent(event: any) {
//     const ray = this.viewer.camera.getPickRay(event.position);
//     const position = this.viewer.scene.pickPosition(event.position);

//     if (position) {
//       Cesium.when(
//         Cesium.sampleTerrainMostDetailed(
//           this.viewer.terrainProvider,
//           [position],
//           12
//         ),
//         (samples: any) => {
//           const cartographic = Cesium.Cartographic.fromCartesian(position);
//           const altitude = cartographic.height;
//           const terrainHeight = samples[0].height;

//           const longitude = Cesium.Math.toDegrees(cartographic.longitude);
//           const latitude = Cesium.Math.toDegrees(cartographic.latitude);

//           const altitudeMSL = altitude + terrainHeight;

//           console.log('Picked position:', longitude, latitude, altitudeMSL);
//         },
//         (error: any) => {
//           console.log('Failed to sample terrain:', error);
//         }
//       );
//     }
//   }

//   // handleRightClickEvent(event: any) {
//   //   const ellipsoid = this.viewer.scene.globe.ellipsoid;
//   //   const cartesian = this.viewer.camera.pickEllipsoid(
//   //     event.position,
//   //     ellipsoid
//   //   );
//   //   console.log(cartesian, 'cartesian');
//   //   if (cartesian) {
//   //     const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
//   //     console.log(cartographic, 'cartographic');
//   //     const longitude = Cesium.Math.toDegrees(cartographic.longitude);
//   //     const latitude = Cesium.Math.toDegrees(cartographic.latitude);
//   //     const height = cartographic.height;

//   //     console.log('Picked position:', longitude, latitude, height);
//   //   }
//   // }
// }
// //   constructor() {}

// //   ngOnInit() {}

// //   ngAfterViewInit() {
// //     this.initMap();
// //   }

// //   initMap() {
// //     const viewer = new Cesium.Viewer('cesiumContainer', {
// //       accessToken:
// //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMjg5MWYyNS1jMTY5LTQzNjctOGVjNi0yODRiNGU4OGRmYzAiLCJpZCI6MTUwMDcwLCJpYXQiOjE2ODc5ODEwMzl9.NKFky9aBWGyFqyD8_ZFnM7sDBGS0hnmjhHbfR4QworI',
// //     });

// //     viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(
// //       movement: any
// //     ) {
// //       const pickedFeature = viewer.scene.pick(movement.position);
// //       if (!Cesium.defined(pickedFeature)) {
// //         const worldPosition = viewer.scene.pickPosition(movement.position);
// //         console.log(worldPosition, 'worldPosition');
// //         // nothing picked
// //         return;
// //       }
// //       const worldPosition = viewer.scene.pickPosition(movement.position);
// //       console.log(worldPosition, 'worldPosition');
// //     },
// //     Cesium.ScreenSpaceEventType.LEFT_CLICK);

// //     // viewer.screenSpaceEventHandler.setInputAction((event: any) => {
// //     //   const pickedObject = viewer.scene.pick(event.position);
// //     //   console.log(event, 'event');
// //     //   console.log(pickedObject, 'pickedObject');

// //     //   if (Cesium.defined(event.position)) {
// //     //     const cartesian = viewer.scene.pickPosition(event.position);
// //     //     console.log(cartesian, 'cartesian');
// //     //     // const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
// //     //     // const longitude = Cesium.Math.toDegrees(cartographic.longitude);
// //     //     // const latitude = Cesium.Math.toDegrees(cartographic.latitude);
// //     //     // const height = cartographic.height;
// //     //     // console.log('Selected position:', longitude, latitude, height);
// //     //   } else {
// //     //     const worldPosition = viewer.scene.pickPosition(event.position);
// //     //     console.log(worldPosition, 'worldPosition');
// //     //   }
// //     // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

// //     // const scene = viewer.scene;
// //     // console.log(scene, 'scene');
// //     // const ellipsoid = scene.globe.ellipsoid;
// //     // const position = Cesium.Cartesian3.fromDegrees(0.0, 0.0);
// //     // const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
// //     // handler.setInputAction((event: any) => {
// //     //   console.log(event, 'event');
// //     //   console.log(position, 'position');

// //     //   console.log(scene.cartesianToCanvasCoordinates(position));
// //     // }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
// //   }
// // }
