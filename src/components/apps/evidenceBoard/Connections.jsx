// components/apps/evidenceBoard/Connections.jsx
import React from "react";
import styles from "./Connections.module.scss";

const Connections = ({ connections, evidence, temporaryConnector }) => {
  // Helper to find evidence by ID
  const findEvidence = (id) => evidence.find((item) => item.id === id);

  // Calculate connection path
  const getConnectionPath = (fromPos, toPos) => {
    // Calculate control points for curved connection
    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Make curve more pronounced for longer distances
    const curveStrength = Math.min(distance * 0.2, 50);

    // Midpoint
    const mx = fromPos.x + dx * 0.5;
    const my = fromPos.y + dy * 0.5;

    // Control points perpendicular to the line
    const perpX = (-dy / distance) * curveStrength;
    const perpY = (dx / distance) * curveStrength;

    // Path data
    return `M ${fromPos.x} ${fromPos.y} Q ${mx + perpX} ${my + perpY}, ${
      toPos.x
    } ${toPos.y}`;
  };

  return (
    <svg className={styles.connections}>
      {/* Render saved connections */}
      {connections.map((connection) => {
        const fromEvidence = findEvidence(connection.from);
        const toEvidence = findEvidence(connection.to);

        if (!fromEvidence || !toEvidence) return null;

        const fromPos = {
          x: fromEvidence.position.x + 100, // Assuming evidence item is 200px wide
          y: fromEvidence.position.y + 50, // And 100px high
        };

        const toPos = {
          x: toEvidence.position.x + 100,
          y: toEvidence.position.y + 50,
        };

        const pathData = getConnectionPath(fromPos, toPos);

        return (
          <g key={connection.id} className={styles.connection}>
            <path
              d={pathData}
              className={styles[connection.color] || styles.cyan}
            />

            {connection.label && (
              <text
                x={(fromPos.x + toPos.x) / 2}
                y={(fromPos.y + toPos.y) / 2}
                dy={-5}
                className={styles.connectionLabel}
              >
                {connection.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Render temporary connection when in connecting mode */}
      {temporaryConnector && (
        <path
          d={getConnectionPath(
            {
              x: temporaryConnector.fromPosition.x + 100,
              y: temporaryConnector.fromPosition.y + 50,
            },
            temporaryConnector.toPosition
          )}
          className={styles.temporaryConnector}
        />
      )}
    </svg>
  );
};

export default Connections;
