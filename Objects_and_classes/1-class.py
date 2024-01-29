class Tree:
    def __call__(self, species, height, age):
        #construct method to intitilaise the tree's attribute
        self.species= species
        self.height=height
        self.age=-age

        #method to describe the tree
        #def describe(self):
         #   return f"A {self.age} year old {self.species} tree, about {self.height} meters tall"
        def grow(self):
            self.height +=1
        def reseed(self):
            print(f"The {self.species} tree disperses seeds for new trees")


        #Oak and pine subclasses
class Oak(Tree):
    def budding(self):
            print(f"The {self.species} tree is budding new leaves. ")
class Pine(Tree):
     def cone_count(self):
          print(f"The {self.species} tree has many cones.")       
        # creating objects of the subclass
oak_tree= Oak("Oak", 100,20)
pine_tree= Pine("Pine", 50, 15)

# demonstratng new methods in the subclass
oak_tree.budding()
pine_tree.cone_count()