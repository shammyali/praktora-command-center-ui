
import { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableChannelItem from "./SortableChannelItem";

export interface Channel {
  id: string;
  name: string;
}

interface ChannelPrioritySectionProps {
  channels: Channel[];
  setChannels: React.Dispatch<React.SetStateAction<Channel[]>>;
}

const ChannelPrioritySection = ({ channels, setChannels }: ChannelPrioritySectionProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setChannels((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium">Channel Priority Order</h3>
      <p className="text-sm text-muted-foreground mb-3">Drag to reorder channels by priority (highest at top)</p>
      
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={channels.map(c => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {channels.map((channel) => (
            <SortableChannelItem key={channel.id} id={channel.id}>
              {channel.name}
            </SortableChannelItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ChannelPrioritySection;
