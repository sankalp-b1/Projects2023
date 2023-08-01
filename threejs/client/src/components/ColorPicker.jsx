import React from "react";
import { SketchPicker } from 'react-color'
import { useSnapshot } from "valtio";

import state from "../store";

const ColorPicker = () => {
  const snap = useSnapshot(state);
  
  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        presetColors={[
          '#000000',     // Black
          '#ffffff',     // White
          '#FF8C00',     // Neon Orange (More Vibrant)
          '#00FF00',     // Neon Green (More Vibrant)
          '#FFFF00',     // Neon Yellow (More Vibrant)
          '#00FFFF',     // Neon Cyan (More Vibrant)
          '#FF00FF',     // Neon Magenta (More Vibrant)
          '#FF1493',     // Neon Pink (More Vibrant)
          '#FF4500',     // Neon Red (More Vibrant)
          '#32CD32',     // Neon Lime Green (More Vibrant)
          '#00CED1',     // Neon Dark Turquoise (More Vibrant)
          '#FFD700',     // Neon Gold (More Vibrant)
          '#9932CC',     // Neon Dark Orchid (More Vibrant)
          '#8B4513',     // Earthy Brown
          '#228B22',     // Earthy Green
          '#D2691E',     // Earthy Chocolate
          '#8B4513',     // Earthy Sienna
          '#BDB76B',     // Earthy Olive
          '#CD853F',     // Earthy Peru
        ]}


        onChange={(color) => state.color = color.hex}
      />
    </div>
  )
};

export default ColorPicker;
