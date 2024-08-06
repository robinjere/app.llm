import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = FastAPI()

# Load models
llama2_model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-chat-hf")
llama2_tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-2-7b-chat-hf")

mistral_model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-v0.1")
mistral_tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-v0.1")

class Query(BaseModel):
    model: str
    question: str
    conversation_id: str

conversations = {}

@app.post("/query")
async def query_llm(query: Query):
    if query.model not in ["llama2", "mistral"]:
        raise HTTPException(status_code=400, detail="Invalid model selection")
    
    if query.conversation_id not in conversations:
        conversations[query.conversation_id] = []
    
    conversations[query.conversation_id].append(f"Human: {query.question}")
    
    context = "\n".join(conversations[query.conversation_id])
    
    if query.model == "llama2":
        model = llama2_model
        tokenizer = llama2_tokenizer
    else:
        model = mistral_model
        tokenizer = mistral_tokenizer
    
    inputs = tokenizer(context, return_tensors="pt")
    output = model.generate(**inputs, max_length=200)
    response = tokenizer.decode(output[0], skip_special_tokens=True)
    
    conversations[query.conversation_id].append(f"AI: {response}")
    
    return {"response": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
