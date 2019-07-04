"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBearerHeaderOptions = (token) => {
    return {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
};
