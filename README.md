# FinTrack 

> **A Premium UI/UX Finance Dashboard engineered for Bharat.**  
> **Designed and Developed by Prajwal Patil.**

FinTrack is an exclusively designed, mobile-responsive, aesthetic-driven web application to intelligently track, manage, and analyze Indian financial metrics (INR). Tailored heavily towards Hackathon UI/UX standards, the dashboard fuses ultra-clean dark/light modes, high-contrast dynamic components, perfectly synchronized mathematical visualizations, and native mobile-first swiping paradigms into a unified frontend experience.

---

##  Overview of Approach & UX Philosophy

The architecture was intentionally crafted without relying on pre-built templates or rigid UI libraries like Material-UI. Every component is custom-engineered to ensure absolute control over the user experience (UX) and the interface (UI):

1. **State-Driven Performance (Zustand)**: A robust global state isolates API logic from rendering concerns. The `useFinanceStore` instantly syncs transactions, recalculates multi-layer chart graphs mathematically, and triggers UI updates everywhere flawlessly in real-time.
2. **Standardized Deep Darkness**: Instead of harsh blacks, the Dark Mode is engineered around a carefully calibrated Slate palette (`#0f172a` base, `#1e293b` cards) mapped securely through Tailwind variants, providing absolute readability and contrast accessibility for financial data.
3. **"Bharat" Localization First**: By using native `Intl.NumberFormat('en-IN')`, formatting integrates standard Indian Lakhs ('L') scaling and traditional INR comma paradigms (e.g., `₹1,00,000`). The underlying mock generation logic strictly binds to recognizable domestic transactions (UPI, Zepto, Swiggy, EMI).
4. **Fluid Micro-Interactions**: All components rely on subtle physics. The `framer-motion` hooks smoothly render grid tiles, while native CSS drives tactile hover-state lifting and responsive scaling across mobile viewports.

---

##  Tech Stack

- **Frontend Core**: React 19 + TypeScript + Vite 
- **State Management**: Zustand
- **Styling Architecture**: Tailwind CSS v4 (using Custom CSS Grid & Variable Theming)
- **Data Visualization**: Recharts (Custom Area & Pie integrations)
- **Animations / UX Elements**: Framer Motion & Lucide Icons

---

##  Explanations of Features

- **Wealth Trajectory Subsystem (Area Chart)**: A historically accurate Recharts integration. The data algorithm pulls absolute cumulative arrays, maps them across a dynamic 30-day chronological bucket, strictly computes net daily flows, and iteratively aligns the final end-point to mirror the exact total dashboard balance down to the Rupee.
- **Dynamic Advanced Filtering**: Built a native local search & filtering engine on the Transaction table capable of stacking queries. You can stack a Time Range (`Last 7 Days`), a single auto-detected dynamic Category (`Groceries (Zepto/Blinkit)`), and standard string Search operations natively without relying on an external server.
- **Quick UPI Actions Hub**: Instead of simple flat grids, the dashboard relies on a natively swiping, snap-driven horizontal quick-action row specifically mimicking domestic Fintech architectures directly on small mobile devices (`overflow-x-auto snap-x`). 
- **Role-Based Access Simulation**: Front-end state handles interactive simulated roles (`Viewer` vs `Admin`), seamlessly hiding modification privileges and dashboard elements based on the current context array.

---

##  Setup Instructions (Manual Review)

Follow these steps to run the application on your local machine manually:

### 1. Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v18.0.0 or higher recommended)
- `npm` (comes with Node.js)

### 2. Installation
Extract the provided project folder and open a terminal inside the root directory (`/Finance UI`):

```bash
# Install all required dependencies
npm install
```

### 3. Launch Development Server
```bash
# Boot the Vite development server
npm run dev
```

### 4. Open in Browser
Once the server launches, explicitly copy the `Local` url generated in the terminal (usually `http://localhost:5173`) and paste it into your browser. 


