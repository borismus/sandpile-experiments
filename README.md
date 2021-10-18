# Abelian sandpile experiments

Most Abelian sandpile simulations are rendered from the top down as a heat map, with colors corresponding to each of the (four) heights. The rules are incredibly simple:

1. A grain of sand pours into the center cell of the world (discrete 2x2 grid)
2. If the height of any cell becomes 4, it spills into the four cardinally adjacent cells and becomes 0. This proceeds recursively, and can often cause a cascade of other spills as adjacent cells also reach a critical height.

The cool theoretical result of this model is that the size of the cascade follows a power law. (Size of the cascade is defined as the length of the causal chain caused by one of the sands). This is similar to other phenomena observed in nature: earthquakes.

# Diagonal variant

What if the model has a maximum of height 8, and the pieces fall to the diagonals as well?

Seems to have similar properties overall. Maybe this is theoretically reducible to the classic model.

# Cross-sectional rendering

What if we instead render it as a cross section of this pile? What if we add some flourish with "grains" of sand actually animating as they topple? That would certainly add some flair to the whole abstraction.

Turns out this is extremely uncompelling because the pile is of discrete heights 0, 1, 2, 3. (or [0-8] in the case of the diagonal variant.)

How can we make a sandpile that has the potential to be taller? Perhaps we can consider not just the height of each cell, but the height of each cell relative to its neighbors?

# 3D Rendering

Under classic conditions, pretty boring for the same reason as state in cross-sectional rendering.

# Probability-based collapses

What if we move to a probabilistic criticality, so that each cell has a probability of collapsing to adjacent cells proportional to its height, something like P(cell.collapse) = Sigmoid(cell.height) where Sigmoid(x) = 1 / (1 + exp(-x)).

One thing to work out under this model is where the extra cells go to, since you may have as few as 1, or as many as infinity (theoretically). Suddenly you have much more complex collapse logic. A physics based approach would have the collapse fall downward. In that case, maybe each cell considers its neighbors height too, an intuition based on being 'reinforced'. If it's already the shortest pile in the vicinity, it is considered stable.

Thus maybe collapse probability is something like this:

```
mnh = min([neighbor_i.height])
P(cell.collapse) = 0,                          if cell.height < mnh
                   Sigmoid(cell.height - mnh), otherwise
```

Using this approach, the pile should stabilize itself as long as each iteration 


# A side-variant?

What if the model is also considered from the side, in 1D? Could we have a different set of rules that make sense? Does it still exhibit the same self-organized criticality that the original did?

