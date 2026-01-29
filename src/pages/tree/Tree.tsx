/* eslint-disable @typescript-eslint/no-explicit-any */
import Tree from "react-d3-tree";
import "./tree.css";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Particles } from "@/components/magicui/particles";

const orgChart = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
            show: false,
          },
          children: [
            {
              name: "Worker",
            },
            {
              name: "Worker 2",
              children: [
                {
                  name: "worker 4",
                },
              ],
            },
            {
              name: "Worker 3",
            },
          ],
        },
        {
          name: "Foreman 1",
          attributes: {
            department: "Fabrication 1",
            salarry: 200,
          },
          children: [
            {
              name: "Worker 1",
            },
            {
              name: "Worker 5",
            },
            {
              name: "Worker 6",
              children: [
                {
                  name: "worker 8",
                },
                {
                  name: "worker 9",
                },
                {
                  name: "worker 10",
                },
                {
                  name: "worker 11",
                },
              ],
            },
            {
              name: "Worker 7",
              children: [
                {
                  name: "worker 8",
                  attributes: {
                    department: "CWH",
                    show: false,
                  },
                },
                {
                  name: "worker 9",
                },
                {
                  name: "worker 10",
                },
                {
                  name: "worker 11",
                },
              ],
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
};

const getColour = (
  isConnectingGen: boolean,
  isRootNode: boolean,
  isLeafNode: boolean,
  show: boolean
) => {
  if (show===false) {
    return "red";
  }
  if (isConnectingGen) {
    return "yellow";
  } else if (isRootNode) {
    return "green";
  } else if (isLeafNode) {
    return "blue";
  }
  return "red";
};

export default function OrgChartTree() {
  const { theme } = useTheme();

  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [showCard, setShowCard] = useState(false);
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (hoveredNode) {
      timer = setTimeout(() => setShowCard(true), 300); // Delay before showing card
    } else {
      setShowCard(false);
    }
    return () => clearTimeout(timer);
  }, [hoveredNode]);

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" className="h-full bg-cyan-200">
      <Tree
        data={orgChart}
        collapsible={false}
        separation={{ siblings: 1, nonSiblings: 4 }}
        // dimensions={{ height: 300, width: 500 }}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        nodeSize={{ x: 250, y: 70 }}
        onNodeMouseOver={(nodeData, event) => {
          setHoveredNode(nodeData);
          setHoverPosition({ x: event.clientX - 250, y: event.clientY });
        }}
        renderCustomNodeElement={({ nodeDatum, hierarchyPointNode }) => {
          const isConnectingGen =
            !!hierarchyPointNode.parent &&
            (hierarchyPointNode.children?.length ?? 0) > 0;

          const isRootNode = !!hierarchyPointNode.parent
          const isLeafNode = !!hierarchyPointNode.children
          return (
            <g>
              {/* Circle with dynamic fill color */}
              <circle
                r="20"
                fill={getColour(
                  isConnectingGen,
                  isRootNode,
                  isLeafNode,
                  nodeDatum.attributes?.show as any
                )}
                stroke="black"
                strokeWidth="2"
              />
              <text x="0" y="35" textAnchor="middle"  className="font-thin">
                {nodeDatum.name}
                <br />
                {Object.entries(nodeDatum?.attributes ?? {}).map(
                  ([key, value]) => {
                    return (
                      <>
                        <text>{key}</text> <text>{value}</text>
                      </>
                    );
                  }
                )}
              </text>
            </g>
          );
        }}
        onNodeMouseOut={() => setHoveredNode(null)}
      />
      {hoveredNode && (
        <div
          className={`absolute bg-white shadow-lg p-3 rounded-lg transition-opacity duration-300 ${
            showCard ? "opacity-100" : "opacity-0"
          }`}
          style={{
            top: hoverPosition.y + 10,
            left: hoverPosition.x + 10,
          }}
        >
          <h4 className="font-semibold">{hoveredNode.name}</h4>
          {hoveredNode.attributes &&
            Object.entries(hoveredNode.attributes()).map(([key, value]) => (
              <p key={key} className="text-sm text-gray-600">
                {key}: {value}
              </p>
            ))}
        </div>
      )}
      <Particles
        className="absolute inset-0 z-0"
        quantity={200}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
}

/*


interface TreeNode {
  id: string;
  info: string;
  children: TreeNode[];
  [x: string]: TreeNode | undefined;
}

const treeData: TreeNode = {
  id: "Root",
  info: "Root Node",
  children: [
    {
      id: "A",
      info: "Node A",
      children: [
        { id: "A1", info: "Node A1", children: [] },
        { id: "A2", info: "Node A2", children: [] },
      ],
    },
    {
      id: "B",
      info: "Node B",
      children: [
        { id: "B1", info: "Node B1", children: [] },
        {
          id: "B2",
          info: "Node B2",
          children: [
            { id: "B2a", info: "Node B2a", children: [] },
            { id: "B2b", info: "Node B2b", children: [] },
          ],
        },
      ],
    },
    {
      id: "C",
      info: "Node C",
      children: [
        { id: "C1", info: "Node C1", children: [] },
        { id: "C2", info: "Node C2", children: [] },
      ],
    },
  ],
} as any;

const assignParents = (node: TreeNode, parent: TreeNode | null = null) => {
  node.parent = parent || undefined;
  node.children.forEach((child) => assignParents(child, node));
};
assignParents(treeData);

const NODE_RADIUS = 30; // Circle size
const InteractiveTreeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [dragging, setDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Calculate line endpoint to attach at circle edge
  const getLineEndpoint = (x1: number, y1: number, x2: number, y2: number) => {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    return {
      startX: x1 + Math.cos(angle) * NODE_RADIUS,
      startY: y1 + Math.sin(angle) * NODE_RADIUS,
      endX: x2 - Math.cos(angle) * NODE_RADIUS,
      endY: y2 - Math.sin(angle) * NODE_RADIUS,
    };
  };

  const calculateNodePositions = (node, depth = 0, xOffset = 0) => {
    let positions: any[] = [];
    let currentXOffset = xOffset;
    
    if (node.children.length === 0) {
      positions.push({ node, x: currentXOffset, y: depth * 100 });
      return positions;
    }
  
    let childSpacing = 250; // Minimum spacing between nodes
    let startX = currentXOffset;
  
    node.children.forEach((child, index) => {
      let childPositions = calculateNodePositions(child, depth + 1, startX);
      startX = childPositions[childPositions.length - 1].x + childSpacing;
      positions = positions.concat(childPositions);
    });
  
    // Center parent node above children
    let parentX = (positions[0].x + positions[positions.length - 1].x) / 2;
    positions.push({ node, x: parentX, y: depth * 100 });
  
    return positions;
  };

  // Draw Tree on Canvas
  const drawTree = (ctx, rootNode, canvasWidth) => {
    let positions = calculateNodePositions(rootNode, 0, canvasWidth / 2);
    
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw lines first
    positions.forEach(({ node, x, y }) => {
      if (node.parent) {
        let parentPos = positions.find(p => p.node === node.parent);
        const { startX, startY, endX, endY } = getLineEndpoint(parentPos.x, parentPos.y, x, y);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    });
  
    // Draw nodes
    positions.forEach(({ node, x, y }) => {
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(x, y, NODE_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.id, x, y);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);
    drawTree(ctx, treeData, canvas.width / 2, 50);
    ctx.restore();
  }, [scale, offset]);

  // Zoom to cursor
  const handleWheel = (event: WheelEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const scaleAmount = 1.1;
    const mouseX = event.clientX - offset.x;
    const mouseY = event.clientY - offset.y;

    const newScale =
      event.deltaY > 0 ? scale / scaleAmount : scale * scaleAmount;

    setOffset({
      x: mouseX - (mouseX - offset.x) * (newScale / scale),
      y: mouseY - (mouseY - offset.y) * (newScale / scale),
    });

    setScale(newScale);
  };

  // Drag (Pan) Handling
  const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>) => {
    setDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    if (dragging) {
      setOffset((prev) => ({
        x: prev.x + event.clientX - dragStart.x,
        y: prev.y + event.clientY - dragStart.y,
      }));
      setDragStart({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      <h2>Zoom & Pan Tree</h2>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{
          border: "1px solid black",
          cursor: dragging ? "grabbing" : "grab",
        }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};

export default InteractiveTreeCanvas;




*/
