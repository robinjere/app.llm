FROM python:3.9

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download models
# RUN python -c "from transformers import AutoModelForCausalLM, AutoTokenizer; AutoModelForCausalLM.from_pretrained('meta-llama/Llama-2-7b-chat-hf', use_auth_token=True); AutoTokenizer.from_pretrained('meta-llama/Llama-2-7b-chat-hf', use_auth_token=True); AutoModelForCausalLM.from_pretrained('mistralai/Mistral-7B-v0.1'); AutoTokenizer.from_pretrained('mistralai/Mistral-7B-v0.1')"

# Pre-download models
RUN python -c "from transformers import AutoModelForCausalLM, AutoTokenizer; AutoModelForCausalLM.from_pretrained('daryl149/llama-2-7b-chat-hf'); AutoTokenizer.from_pretrained('daryl149/llama-2-7b-chat-hf'); AutoModelForCausalLM.from_pretrained('mistralai/Mistral-7B-v0.1'); AutoTokenizer.from_pretrained('mistralai/Mistral-7B-v0.1')"

COPY . .

CMD ["python", "main.py"]
