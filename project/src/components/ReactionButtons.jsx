// ReactionButtons component - Handles like/love/smile reactions with single-selection
import React, { useState } from 'react';
import { Heart, Smile, ThumbsUp } from 'lucide-react';

function ReactionButtons({ size = "normal" }) {
  // State to track which reaction is currently active (only one can be selected at a time)
  const [activeReaction, setActiveReaction] = useState(null);

  // Function to handle reaction button clicks
  const handleReactionClick = (reactionType) => {
    // If clicking the same reaction that's already active, deactivate it
    if (activeReaction === reactionType) {
      setActiveReaction(null);
    } else {
      // Otherwise, set the new reaction as active
      setActiveReaction(reactionType);
    }
  };

  // Define button sizes based on the size prop
  const buttonSize = size === "small" ? "p-2" : "px-4 py-2";
  const iconSize = size === "small" ? "w-4 h-4" : "w-5 h-5";

  // Define reaction buttons with their properties
  const reactions = [
    {
      type: 'like',
      icon: ThumbsUp,
      label: 'Like',
      activeColor: 'bg-purple-500 text-white border-purple-500',
      inactiveColor: 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300'
    },
    {
      type: 'love',
      icon: Heart,
      label: 'Love',
      activeColor: 'bg-pink-500 text-white border-pink-500',
      inactiveColor: 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-300'
    },
    {
      type: 'smile',
      icon: Smile,
      label: 'Smile',
      activeColor: 'bg-blue-500 text-white border-blue-500',
      inactiveColor: 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300'
    }
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {reactions.map((reaction) => {
        const Icon = reaction.icon;
        const isActive = activeReaction === reaction.type;
        
        return (
          <button
            key={reaction.type}
            onClick={() => handleReactionClick(reaction.type)}
            className={`
              ${buttonSize}
              border rounded-full
              transition-all duration-200
              flex items-center gap-2
              font-medium text-sm
              transform hover:scale-105 active:scale-95
              ${isActive ? reaction.activeColor : reaction.inactiveColor}
            `}
            aria-label={`${reaction.label} this ${size === "small" ? "comment" : "article"}`}
          >
            <Icon className={iconSize} />
            {size === "normal" && <span>{reaction.label}</span>}
          </button>
        );
      })}
      
      {/* Show active reaction feedback */}
      {activeReaction && size === "normal" && (
        <span className="text-sm text-gray-500 ml-2 animate-fade-in">
          You {activeReaction}d this article!
        </span>
      )}
    </div>
  );
}

export default ReactionButtons;