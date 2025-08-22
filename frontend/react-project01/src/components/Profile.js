import React from "react";
import avatar from "../assets/avatar.jpg"; // 👈 thay bằng ảnh của bạn

function Profile() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #1e3c72, #2a5298)"
    }}>
      <div style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        textAlign: "center",
        width: "350px",
        transition: "transform 0.3s ease"
      }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        {/* Avatar */}
        <img
          src={avatar}
          alt="profile"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "15px",
            border: "4px solid #2a5298"
          }}
        />

        {/* Info */}
        <h2 style={{ margin: "10px 0", color: "#2a5298" }}>
          Châu Văn Thân
        </h2>
        <p style={{ margin: "5px 0", fontWeight: "bold", color: "#444" }}>
          MSSV: 22110425
        </p>
        <p style={{ margin: "5px 0", color: "#555" }}>
          💻 Software Developer | React Enthusiast 🚀
        </p>
        <p style={{ margin: "5px 0", color: "#777" }}>
          📧 thanchau.100100@gmail.com
        </p>

        {/* Social */}
        <div style={{ marginTop: "15px" }}>
          <a
            href="https://github.com/Than2k4"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              margin: "0 10px",
              textDecoration: "none",
              color: "#2a5298",
              fontWeight: "bold",
              transition: "color 0.3s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#1e3c72"}
            onMouseLeave={e => e.currentTarget.style.color = "#2a5298"}
          >
            🌐 GitHub
          </a>
        </div>

        {/* Button */}
        <div style={{ marginTop: "20px" }}>
          <button style={{
            background: "#2a5298",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.3s ease"
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#1e3c72"}
            onMouseLeave={e => e.currentTarget.style.background = "#2a5298"}
          >
            Follow Me
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
