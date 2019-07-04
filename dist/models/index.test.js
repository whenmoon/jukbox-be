"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = __importDefault(require("chai"));
chai_1.default.should();
const test_utils_1 = require("../services/test-utils");
const _1 = require("./");
describe('Models', () => {
    describe('VenueSong', () => {
        it('should sort songs for a given venue', () => __awaiter(this, void 0, void 0, function* () {
            const sortedPlaylist = yield _1.VenueSong.sortPlaylist(test_utils_1.mockPlaylist);
            sortedPlaylist.should.deep.equal(test_utils_1.sortedMockPlaylist);
        }));
    });
});
