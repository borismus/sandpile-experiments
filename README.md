# Abelian sandpile side-view

Most Abelian sandpile simulations are rendered from the top down as a heat map, with colors corresponding to each of the (four) heights. The rules are incredibly simple:

1. A grain of sand pours into the center cell of the world (discrete 2x2 grid)
2. If the height of any cell becomes 4, it spills into the four cardinally adjacent cells and becomes 0. This proceeds recursively, and can often cause a cascade of other spills as adjacent cells also reach a critical height.

The cool theoretical result of this model is that the size of the cascade follows a power law. (Size of the cascade is defined as the length of the causal chain caused by one of the sands)

What if we instead render it as a cross section of this pile? What if we add some flourish with "grains" of sand actually animating as they topple? That would certainly add some flair to the whole abstraction.

What if we render it in 3D?

What if the model is also considered from the side, in 1D? Could we have a different set of rules that make sense? Does it still exhibit the same self-organized criticality that the original did?

What if the model has a maximum of height 8, and the pieces fall to the diagonals as well?

What if we move to a probabilistic criticality, so that each cell has a probability of collapsing to adjacent cells proportional to its height, something like P(collapse) = {0, if h < 4}, {S(h), if h >= 4} where S(h) = 1 / (1 + exp(-x))