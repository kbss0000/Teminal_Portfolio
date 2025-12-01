const HandwrittenEquationSolverContent = `
<h2>Handwritten Equation Solver</h2>
<p><strong>Tech Stack:</strong> TensorFlow, Next.js, FastAPI, OpenCV, Hugging Face</p>
<p><strong>Live Demo:</strong> <a href="https://simple-math-solver.vercel.app/" target="_blank" style="color: #00FF00; text-decoration: underline;">simple-math-solver.vercel.app</a></p>
<p><strong>GitHub:</strong> <a href="https://github.com/kbss0000/Handwritten-Equation-Solver" target="_blank" style="color: #00FF00; text-decoration: underline;">github.com/kbss0000/Handwritten-Equation-Solver</a></p>

<p>A full-stack deep learning application that recognizes and solves handwritten mathematical equations from images using computer vision and neural networks.</p>

<h3>Features:</h3>
<ul>
  <li>CNN-based recognition achieving 95% accuracy in recognizing handwritten digits and mathematical operators</li>
  <li>OpenCV-powered image segmentation pipeline with thresholding, contour extraction, and bounding box generation</li>
  <li>Drag-and-drop image input with real-time processing</li>
  <li>Bounding-box visualization for detected symbols</li>
  <li>Clipboard-based image uploads for quick input</li>
  <li>Real-time equation solving with step-by-step computation</li>
</ul>

<h3>Tech Stack:</h3>
<ul>
  <li>Deep Learning: TensorFlow CNN model for symbol recognition</li>
  <li>Frontend: Next.js with interactive UI</li>
  <li>Backend: FastAPI for efficient inference processing</li>
  <li>Computer Vision: OpenCV for image preprocessing and segmentation</li>
  <li>Deployment: Hugging Face Spaces (FastAPI backend) and Vercel (Next.js frontend)</li>
</ul>
`;

export default HandwrittenEquationSolverContent;

