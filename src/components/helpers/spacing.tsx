import React from "react";

export const Spacing1 = () => <div style={{ marginBottom: "8px" }} />;
export const Spacing2 = () => <div style={{ marginBottom: "16px" }} />;
export const Spacing3 = () => <div style={{ marginBottom: "24px" }} />;
export const Spacing4 = () => <div style={{ marginBottom: "32px" }} />;
export const Spacing5 = () => <div style={{ marginBottom: "40px" }} />;
export const Spacing6 = () => <div style={{ marginBottom: "48px" }} />;
export const Spacing7 = () => <div style={{ marginBottom: "56x" }} />;
export const Spacing8 = () => <div style={{ marginBottom: "64px" }} />;
export const Spacing9 = () => <div style={{ marginBottom: "72px" }} />;
export const Spacing10 = () => <div style={{ marginBottom: "80px" }} />;
export const Spacing = (props: {size: number}) => <div style={{ marginBottom: `${props.size}px` }} />;
