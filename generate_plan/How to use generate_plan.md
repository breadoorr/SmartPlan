## 🎓 Academic Plan Generator using Gemini 2.5 Flash

This script provides a Python interface to the Google Gemini API, specifically using the **`gemini-2.5-flash`** model, to generate a detailed, strategic, and time-allocated plan for any university-level assignment. It adopts the persona of a **"Senior University Strategist"** to break down complex tasks into manageable, scheduled steps.

### 📝 Prerequisites

1.  **Python 3.x:** Ensure you have a working Python environment.
2.  **Required Libraries:** Install the Google Generative AI SDK:
    ```bash
    pip install google.generativeai
    ```

### ⚙️ Setup

1.  **Get Your API Key:** Obtain a free API key from Google AI Studio:
    [https://ai.google.dev/](https://ai.google.dev/)
2.  **Configure the Script:** Open the Python file and replace the placeholder value in the `API_KEY` variable:

    ```python
    # 2. Paste it here:
    API_KEY = "YOUR_API_KEY_HERE"  # <-- Replace this with your actual key
    ```

    *Alternatively, for better security practices, you can set the API key as an environment variable (`GEMINI_API_KEY` or `GOOGLE_API_KEY`) and modify the script to read it from there.*

### 🧠 How It Works

The `create_assignment_plan` function performs the following steps:

1.  **Initialization:** Loads the **`gemini-2.5-flash`** model.
2.  **Dynamic Prompt Generation:** Constructs a powerful prompt that includes:
    * A defined persona (**Senior University Strategist**).
    * The **current date** to ensure accurate scheduling.
    * The full **assignment description** provided by the user.
    * Strict **PLAN INSTRUCTIONS** to force a structured output (4-5 phases, specific steps, Date/Time allocation, and starting **tomorrow**).
3.  **API Call:** Sends the prompt to the Gemini API with specific generation parameters (`temperature=0.5` for a balanced, strategic output).
4.  **Output:** Returns the generated plan as a formatted string (table/list).

### 🚀 Example Usage

The main execution block (`if __name__ == "__main__":`) demonstrates how to use the function with an example assignment:

```python
example_assignment = """
Course: ECON 410 - International Trade
Task: Write a 2,500-word research paper on the economic impact 
      of Brexit on small and medium-sized enterprises (SMEs) in the UK.
Requirements: Must use at least 10 peer-reviewed academic sources, 
              include quantitative data analysis, and a literature review.
Due Date: November 10th
"""

assignment_plan = create_assignment_plan(example_assignment)
# The result will be printed to the console