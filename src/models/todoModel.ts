import mongoose from 'mongoose';

const Todo = mongoose.model(
  'Todo',
  new mongoose.Schema(
    {
      id: mongoose.Schema.Types.UUID,
      title: {
        type: String,
        required: [true, 'A todo must have a title'],
        unique: true,
        trim: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
      archived: {
        type: Boolean,
        default: false,
      },
      priority: {
        type: String,
        enum: {
          values: ['low', 'medium', 'high'],
          message: 'Priority is either low, medium, or high',
        },
        default: 'medium',
      },
      userId: {
        type: mongoose.Schema.Types.UUID,
      },
    },
    { timestamps: true },
  ),
);

export default Todo;
