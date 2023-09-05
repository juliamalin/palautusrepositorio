"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Duration = exports.Level = void 0;
var Level;
(function (Level) {
    Level[Level["narrow"] = 1] = "narrow";
    Level[Level["medium"] = 2] = "medium";
    Level[Level["full"] = 3] = "full";
})(Level || (exports.Level = Level = {}));
var Duration;
(function (Duration) {
    Duration[Duration["short"] = 10] = "short";
    Duration[Duration["medium"] = 20] = "medium";
    Duration[Duration["long"] = 30] = "long";
})(Duration || (exports.Duration = Duration = {}));
