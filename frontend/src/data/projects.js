const projects = [
  {
    slug: "genetic-disease-classifier",
    title: "Genetic Disease Classifier",
    category: "Biomedical ML",
    shortDesc: "Predicts disease risk from genetic marker data using ensemble models.",
    fullDesc:
      "A machine learning pipeline that processes genetic marker datasets and classifies disease risk using an ensemble of gradient-boosted trees and a calibrated neural network. Includes feature importance analysis and cross-validation reporting.",
    techStack: ["Python", "Scikit-learn", "Pandas", "XGBoost"],
    githubUrl: "https://github.com/MahdiFarsad",
    demoUrl: "",
    status: "published",
  },
  {
    slug: "medical-image-segmentation",
    title: "Medical Image Segmentation",
    category: "Image Processing",
    shortDesc: "Deep learning model for segmenting anomalies in medical scans.",
    fullDesc:
      "A U-Net based deep learning model trained to segment anomalies in medical imaging data, with a focus on interpretability through Grad-CAM visualizations.",
    techStack: ["Python", "PyTorch", "OpenCV"],
    githubUrl: "https://github.com/MahdiFarsad",
    demoUrl: "",
    status: "published",
  },
  {
    slug: "ecommerce-platform",
    title: "Full-Stack E-Commerce Platform",
    category: "Full-Stack Development",
    shortDesc: "A complete multi-vendor e-commerce web application.",
    fullDesc:
      "A full-stack e-commerce platform supporting multiple vendors, cart/checkout flow, order management, and an admin dashboard. Built with a React frontend and a Node.js/Express backend.",
    techStack: ["React", "Node.js", "Express", "Tailwind CSS"],
    githubUrl: "https://github.com/MahdiFarsad",
    demoUrl: "",
    status: "published",
  },
  {
    slug: "next-research-idea",
    title: "Biomedical Time-Series Forecasting",
    category: "Data Science",
    shortDesc: "Forecasting patient vitals trends using recurrent architectures.",
    fullDesc:
      "Planned project: exploring LSTM and Transformer-based architectures for forecasting patient vital sign trends from ICU time-series datasets.",
    techStack: ["Python", "PyTorch"],
    githubUrl: "",
    demoUrl: "",
    status: "upcoming",
  },
];

export default projects;
