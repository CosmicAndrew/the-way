import { Vec3 } from 'playcanvas';

export class CameraController {
  constructor(cameraEntity) {
    this.camera = cameraEntity;
    this.targetPos = cameraEntity.getPosition().clone();
    this.targetLookAt = new Vec3();
    this.currentPos = this.targetPos.clone();
    this.currentLookAt = new Vec3();
    this.lerpSpeed = 0.025;
    this.tolerance = 0.01;
  }

  moveTo(pos, lookAt, speed = 0.025) {
    this.targetPos.copy(pos);
    this.targetLookAt.copy(lookAt);
    this.lerpSpeed = speed;
  }

  snapTo(pos, lookAt) {
    this.camera.setPosition(pos);
    this.camera.lookAt(lookAt);
    this.targetPos.copy(pos);
    this.targetLookAt.copy(lookAt);
    this.currentPos.copy(pos);
    this.currentLookAt.copy(lookAt);
  }

  update() {
    this.currentPos.lerp(this.currentPos, this.targetPos, this.lerpSpeed);
    this.currentLookAt.lerp(this.currentLookAt, this.targetLookAt, this.lerpSpeed);
    this.camera.setPosition(this.currentPos);
    this.camera.lookAt(this.currentLookAt);
  }

  get hasSettled() {
    return this.currentPos.distance(this.targetPos) < this.tolerance
      && this.currentLookAt.distance(this.targetLookAt) < this.tolerance;
  }
}
