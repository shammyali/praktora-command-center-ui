
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableChannelItemProps {
  id: string;
  children: React.ReactNode;
}

const SortableChannelItem = ({ id, children }: SortableChannelItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className="bg-white p-3 mb-2 rounded-md border flex items-center justify-between cursor-grab"
    >
      {children}
      <span className="text-gray-400">⋮⋮</span>
    </div>
  );
};

export default SortableChannelItem;
