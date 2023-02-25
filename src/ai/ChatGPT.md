---
marp: true
theme: dark
---

<style>
  img {
    width: 100%
  }
</style>

# ChatGPT

![bg right 70%](https://res.cloudinary.com/drxgh9gqs/image/upload/v1676954586/2023-02-21_12-41-57_fft0co.png)

Theo Sun
2023

---

## Agenda

- Conversations
- Introduction
- Questions

---

- Have you tried `ChatGPT` ?
- Whats your feeling about `ChatGPT` ?

---

## Conversations

---

## Conversation 1 - Date

<style scoped>
  p { 
    text-align: center;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>

![](https://res.cloudinary.com/drxgh9gqs/image/upload/v1676956295/2023-02-21_13-08-11_tfxa7p.png)

---

## Conversation 1 - Date

- No access for external systems
  - But it is technically feasible
- Continuously fine-tuned by users' input
  - Don't send any sensitive data/secret to un-trusted model
- Users need to determine the credibility of information

---

## Conversation 2 - Base64 and MongoDB for CDS

<style scoped>
  p { 
    text-align: center;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>

![](https://res.cloudinary.com/drxgh9gqs/image/upload/v1676956761/2023-02-21_13-19-12_fxjizx.png)

---

## Conversation 2 - Base64 and MongoDB for CDS

- Not really `understand` the base64 algorithm
  - but somehow it looks like `ChatGPT` build a `base64->text mapping` in text way
- It works with `context`
  - without context, the answer goes to uncertainty direction
- Could build source code with existing knowledge
  - outdated `@sap/cds-runtime`
- Could give some suggestions even do not know any relevant knowledge
  - there is no reference for topic `MongoDB for SAP CDS`
- Could migrate existed knowledge into new `context`
- Could understand what I said, and correctly enhance proper part of code
  - `req.where.query`

---

## Conversation 2 - Base64 and MongoDB for CDS

- But for `programming perspective`, there are a lot of things missing
  - Register/Override handlers/Build/Deploy
  - Connection Pool/Connection Acquire/Transaction
- But in `AI perspective`, maybe the developer replacement is `NOT` a `progressive` way.
  - No need to adapt to some stupid programming principles, such as `name convention`/`code quality`/`code readability`/`reuse`
  - AI sometime will response with `wrong answer`, while human developer sometime will develop `fresh bugs`.
  - So, imagine: end-user give their requirement/input/context to AI, then business fully processed by AI, then AI response the final result, no programming any more. make sense ?

---

## Conversation 3 - AES Decryption

<style scoped>
  p { 
    text-align: center;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>

![](https://res.cloudinary.com/drxgh9gqs/image/upload/v1676956404/2023-02-21_13-13-17_xh0bwf.png)

---

## Conversation 3 - AES Decryption

- Text based model
  - not really understand the algorithm
  - even not have a try
- If we connect `ChatGPT` with some external runner ?
  - [Toolformer - Meta](https://arxiv.org/abs/2302.04761)

---

## Conversation 4 - The Programming Assistant

<style scoped>
  p { 
    text-align: center;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>

![](https://res.cloudinary.com/drxgh9gqs/image/upload/v1676956884/2023-02-21_13-21-17_i6glaw.png)

---

## Conversation 5 - Need Your Input/Ask what I've known

<style scoped>
  p { 
    text-align: center;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>

![](https://res.cloudinary.com/drxgh9gqs/image/upload/v1676957119/2023-02-21_13-24-56_fbm3db.png)

---

## Conversation 6 - 42

<style scoped>
  p { 
    text-align: center;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>

![](https://res.cloudinary.com/drxgh9gqs/image/upload/v1676957236/2023-02-21_13-27-06_ni59iw.png)

---

## Conversation 6 - 42

- Not found an existing identical exact same question on WWW
- But there are many similar questions:
  - [What is the right question to the answer 42? - Quora](https://www.quora.com/What-is-the-right-question-to-the-answer-42)
- Somehow, a good searcher
  - search your question by meaning, migrate or mapping similar questions
  - and give you a summary

---

## Conversation 7 - Translation

<style scoped>
  p { 
    text-align: center;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>

![](https://res.cloudinary.com/drxgh9gqs/image/upload/v1676957542/2023-02-21_13-32-08_uscqay.png)

---

## Conversation 8 - Nuclear Weapon

<style scoped>
  p { 
    text-align: center;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>

![](https://res.cloudinary.com/drxgh9gqs/image/upload/v1676957632/2023-02-21_13-33-47_lvm495.png)

---

## Conversation 8 - Nuclear Weapon

- AI needs more regulation
- AI companies may also have more pressure from moral and ethical aspects

---

## Conversation 9 - Never say 'I don't know'

<style scoped>
  p { 
    text-align: center;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>

![](https://res.cloudinary.com/drxgh9gqs/image/upload/v1676957715/2023-02-21_13-35-08_kivp9t.png)

---

## Introduction

> GPT-3 is a powerful language processing AI model developed by OpenAI, capable of generating human-like text and has a wide range of applications. It is commonly used to create chatbots that can respond to user prompts and questions in a natural language. The model has 175 billion parameters and is one of the largest and most powerful language processing AI models to date. In summary, GPT-3 understands human language and can generate text based on the worded information it is fed.

-- ChatGPT

---

![bg 75%](https://res.cloudinary.com/drxgh9gqs/image/upload/v1677156784/ChatGPT_Diagram_bixw8u.svg)

---

> 我们使用人类反馈强化学习（RLHF）的方法对该模型进行了训练，使用的方法与 InstructGPT 相同，但数据收集设置上有轻微的不同。我们使用有人工智能训练师提供的对话，让他们扮演用户和人工智能助手两方，来对初始模型进行了监督微调。我们为训练师提供了模型编写的建议，以帮助他们组织回应。我们将这个新的对话数据集与 InstructGPT 数据集混合，将其转化为对话格式。

-- ChatGPT

---

> 为了创建强化学习的奖励模型，我们需要收集比较数据，其中包括按质量排名的两个或更多模型响应。为了收集这些数据，我们使用人工智能训练师与聊天机器人进行对话。我们随机选择一条模型编写的消息，采样出几个备选的完成方案，然后让人工智能训练师对它们进行排名。使用这些奖励模型，我们可以使用 Proximal Policy Optimization 来对模型进行微调。我们进行了几次此过程的迭代。

-- ChatGPT

---

## Key Points

- Labeler
  - [Exclusive: OpenAI Used Kenyan Workers on Less Than $2 Per Hour to Make ChatGPT Less Toxic](https://time.com/6247678/openai-chatgpt-kenya-workers/)
- Supervised Learning
- Azure AI supercomputing [infrastructure](https://news.microsoft.com/source/features/ai/openai-azure-supercomputer/).
- In Context Learning (ICL)
  - [Rethinking the Role of Demonstrations: What Makes In-Context Learning Work?](https://arxiv.org/abs/2202.12837)
  - [What Makes Good In-Context Examples for GPT-3?](https://arxiv.org/abs/2101.06804)

---

## Training

For GPT-3

- It would take `355 years` to train GPT-3 on a single NVIDIA Tesla V100 GPU.
- Using 1,024 x A100 GPUs, researchers calculated that OpenAI could have trained GPT-3 in as little as `34 days`.
- Estimated that it cost around $5M in compute time to train GPT-3.
- The supercomputer developed for OpenAI is a single system with more than 285,000 CPU cores, 10,000 GPUs and 400 gigabits per second of network connectivity for each GPU server. - [Microsoft](https://news.microsoft.com/source/features/ai/openai-azure-supercomputer/)

---

## Training

For [`BLOOM`](https://huggingface.co/blog/bloom-megatron-deepspeed)

- Dataset: 46 Languages in 1.5TB of deduplicated massively cleaned up text
- GPUs: 384 NVIDIA A100 80GB GPUs (48 nodes) + 32 spare gpus
- 8 GPUs per node Using NVLink 4 inter-gpu connects, 4 OmniPath links
- CPU: AMD EPYC 7543 32-Core Processor
- CPU memory: 512GB per node
- GPU memory: 640GB per node
- Inter-node connect: Omni-Path Architecture (OPA) w/ non-blocking fat tree
- NCCL-communications network: a fully dedicated subnet
- Disc IO network: GPFS shared with other nodes and users
- Spent `3.5 months`

---

## Inference

For `BLOOM`

- with (i5 11gen, 16GB RAM, 1TB SSD Samsung 980 pro), the generation takes `3 minutes` per token using only the CPU
- all in memory, take `~ 30s` per token

---

## [![bg 85%](https://res.cloudinary.com/drxgh9gqs/image/upload/v1677205427/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE_2023-02-24_102311_qf4agd.png)](https://huggingface.co/bigscience/bloom)

---

## Related Things

- [Mario GPT](https://github.com/shyamsn97/mario-gpt)
- [Bloom](https://huggingface.co/docs/transformers/model_doc/bloom)
- [Toolformer](https://arxiv.org/abs/2302.04761)
- [Prompt Engineering Guide](https://github.com/dair-ai/Prompt-Engineering-Guide)
- [LLaMA](https://github.com/facebookresearch/llama)

---

## Reference

- [The Technology Behind BLOOM Training](https://huggingface.co/blog/bloom-megatron-deepspeed)
- [OpenAI Used Kenyan Workers Making $2 an Hour to Filter Traumatic Content from ChatGPT](https://www.vice.com/en/article/wxn3kw/openai-used-kenyan-workers-making-dollar2-an-hour-to-filter-traumatic-content-from-chatgpt)
- [Microsoft announces new supercomputer, lays out vision for future AI work](https://news.microsoft.com/source/features/ai/openai-azure-supercomputer/)
- [Prerequisite to run bloom locally?](https://discuss.huggingface.co/t/prerequisite-to-run-bloom-locally/20365/3)

---

## Thanks
