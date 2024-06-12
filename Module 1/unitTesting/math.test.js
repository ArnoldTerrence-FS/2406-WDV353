const {add} = require("./math.js")
const {subtract} = require("./math.js");
const {multiply} = require("./math.js");
const {divide} = require("./math.js");
const {squareRoot} = require("./math.js");
const {max} =require("./math.js");

describe("Testing math operator module", () => {

    test("adding two numbers", () => {
        expect(add(4,5)).toBe(9);
    });

    test("substracting two numbers", () => {
        expect(subtract(5,2)).toBe(3);
    });

    test("multiplying two numbers", () => {
        expect(multiply(3,2)).toBe(6);
    });

    test("dividing one number from another", () => {
        expect(divide(10,2)).toBe(5);
    });

    test("square root of a number", () => {
        expect(squareRoot(16)).toBe(4);
    });

    test("finding the bigger number", () => {
        expect(max(4,6)).toBe(6);
    });

});