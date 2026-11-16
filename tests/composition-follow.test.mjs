import assert from "node:assert/strict";
import test from "node:test";
import {
  visibleComposition,
  followComposition,
} from "../lib/studio/composition-follow.ts";

test("re-expression preserves every visible source coordinate and scale", () => {
  for (const original of [
    { x: -0.448, y: 0.3587, width: 2.026, height: 0.641 },
    { x: -2.18, y: 0.286, width: 3.437, height: 1.087 },
  ]) {
    const { box, crop } = visibleComposition(original);
    for (const u of [0, 0.2, 0.5, 0.8, 1])
      for (const v of [0, 0.5, 1]) {
        assert.ok(
          Math.abs(
            original.x +
              original.width * (crop.x + u * crop.width) -
              (box.x + u * box.width),
          ) < 1e-10,
        );
        assert.ok(
          Math.abs(
            original.y +
              original.height * (crop.y + v * crop.height) -
              (box.y + v * box.height),
          ) < 1e-10,
        );
      }
  }
});
test("following starts at the existing crop and retains scale, timing and guards", () => {
  const samples = Array.from({ length: 21 }, (_, i) => ({
    seconds: 2 + i * 0.1,
    faces: [
      { x: 0.3 + i * 0.006, y: 0.2, width: 0.1, height: 0.2, score: 0.95 },
    ],
  }));
  const crop = { x: 0.2, y: 0, width: 0.5, height: 1 };
  const result = followComposition(
    samples,
    { width: 1920, height: 1080 },
    crop,
  );
  assert.equal(result.status, "ready");
  assert.deepEqual(result.path[0].crop, crop);
  assert.ok(result.path.at(-1).crop.x > crop.x + 0.05);
  for (const [i, k] of result.path.entries()) {
    assert.equal(k.seconds, samples[i].seconds);
    assert.equal(k.crop.width, crop.width);
    assert.equal(k.crop.height, crop.height);
    assert.ok(k.crop.x >= 0 && k.crop.x + k.crop.width <= 1);
    assert.equal(k.crop.y, 0);
  }
  samples[10].faces.push({ ...samples[10].faces[0], x: 0.8 });
  assert.equal(
    followComposition(samples, { width: 1920, height: 1080 }, crop).status,
    "multiple_faces",
  );
});
