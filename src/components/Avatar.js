import React from "react";

export default function Avatar({ src }) {
    return (
        <div className="d-inline-block rounded-circle overflow-hidden" style={{ width: "50px", height: "50px" }}>
            <img src={src} alt="user avatar" style={{ width: "100%", height: "100%" }} />
        </div>
    );
}