/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        var transformedMvp = mvp;
        var transformedModelView = modelView;
        var transformedNormals = normalMatrix;
        var transformedModel = modelMatrix;


        // Get the transformation matrix from the TRS (Translation, Rotation, Scaling) object
        var transformationMatrix = this.trs.getTransformationMatrix();

        // Apply the transformation matrix to the MVP (Model-View-Projection) matrix
        transformedMvp = MatrixMult(transformedMvp, transformationMatrix);

        // Apply the transformation matrix to the Model-View matrix
        transformedModelView = MatrixMult(transformedModelView, transformationMatrix);

        // Apply the transformation matrix to the Normals matrix (used for lighting calculations)
        transformedNormals = MatrixMult(transformedNormals, transformationMatrix);

        // Apply the transformation matrix to the Model matrix
        transformedModel = MatrixMult(transformedModel, transformationMatrix);


        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }

        // Iterate through all child nodes of the current scene graph node
        for (const child of this.children) {
            // Recursively call the draw method for each child
            // Pass the transformed matrices (MVP, ModelView, Normals, and Model) to the child node
            child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }

    }

    

}