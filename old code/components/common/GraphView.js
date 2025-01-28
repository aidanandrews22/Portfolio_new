import React, { useCallback, useRef, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

const GraphView = ({ data, type }) => {
  const navigate = useNavigate();
  const fgRef = useRef();

  const getNodeColor = useCallback((node) => {
    const colors = {
      blog: {
        Misc: '#ff7f0e',
        CS: '#2ca02c',
        ML: '#d62728',
        Physics: '#9467bd'
      },
      notes: {
        School: '#1f77b4',
        Work: '#ff7f0e',
        Misc: '#2ca02c',
        Personal: '#d62728'
      }
    };
    return node.isCategory ? colors[type][node.name] : '#999';
  }, [type]);

  const handleNodeClick = useCallback((node) => {
    if (node.isCategory) {
      // Handle category click (e.g., filter posts/notes)
    } else {
      navigate(`/${type}/${node.id}`);
    }
  }, [navigate, type]);

  useEffect(() => {
    const fg = fgRef.current;
    fg.d3Force('charge').strength(-120);
    fg.d3Force('link').distance(link => link.distance);

    // Ensure all nodes are visible on initial render
    if (fg && data.nodes.length > 0) {
      // Give the force simulation some time to settle
      setTimeout(() => {
        fg.zoomToFit(400, 20);
      }, 500);
    }
  }, [data]);

  return (
    <div className="w-full h-[600px] border border-gray-200 rounded-lg overflow-hidden">
      <ForceGraph3D
        ref={fgRef}
        graphData={data}
        backgroundColor='#fff'
        nodeLabel="name"
        nodeColor={getNodeColor}
        nodeVal={(node) => node.isCategory ? 20 : 10}
        nodeResolution={16}
        linkWidth={1}
        linkColor={() => '#999'}
        onNodeClick={handleNodeClick}
        nodeThreeObject={node => {
          const sprite = new THREE.Sprite(
            new THREE.SpriteMaterial({ map: new THREE.TextureLoader().load('/assets/dot.png') })
          );
          sprite.scale.set(12, 12);
          return sprite;
        }}
        nodeThreeObjectExtend={true}
        enableNodeDrag={false}
        enableNavigationControls={true}
        showNavInfo={true}
      />
    </div>
  );
};

export default GraphView;