"use client";

import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
  value: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };
  return (
    <RadixSlider.Root
      className="
    relative
    flex h-10
    items-center
    select-none
    touch-none
    w-full"
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume">
      <RadixSlider.Track
        className="
        bg-neutral-600
        relative
        grow h-[3px]
        rounded-full">
        <RadixSlider.Range
          className="
        absolute
        rounded-full
        h-full
        bg-white"
        />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
