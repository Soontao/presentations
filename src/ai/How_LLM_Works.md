---
marp: true
theme: dark
math: mathjax
---

![bg right](https://res.cloudinary.com/digf90pwi/image/upload/f_auto,q_auto/qtji6rjyijfc9zatldbc)

# How does Large Language Model work

Theo Sun
2024

---

## Setup a raw LLM for evaluation

![bg right 100%](https://res.cloudinary.com/digf90pwi/image/upload/f_auto,q_auto/u04cbdo7sckn08qav5r9)

- [Playground for OpenChat 7B 1210](https://colab.research.google.com/drive/1xqn86ota28L9pscNOdZHvCyqtJsGjQiJ?usp=sharing)
- [bloom](https://huggingface.co/bigscience/bloom)

---

## Transformer

> assume, we have an ANN, to translate a language to another language

$$tokens = tokenizer.encode(sentence)$$

$$output\_tokens[n] = model.generate(tokens, ...output\_token[0...n-1])$$

$$output\_sentences = tokenizer.decode(output\_tokens)$$

---

## Tokenizer

> convert text to numeric - make it computable

![bg right 85%](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/iclmedfdw7rdrxjvzosw)

---

## Attention of Transformer

- [GPT 2 Attention View](https://colab.research.google.com/drive/1YFoZRtK6bDSGxKS7afo_aVaBXSssMexk?usp=sharing)

![bg right](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/usan8bhhv3pqchgiypiu)

---

## Generation

> original, the task for LLM is [`completion`](https://huggingface.co/bigscience/bloom)

![bg right 70%](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/mjcjtdhjaxvatcnqdzex)

---

## Generation

> LLM shows excellent imitation ability - Pattern to Pattern

![bg right 80%](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/isg2eupysozg20qrb9yr)

---

## Generation

> There is no interaction between YOU and AI, it just try to `fill more words and make its fluent` 

![bg right 80%](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/rbjn4p072xlnhildctgu)

---

## Generation

> another example

```text
the first president of US is
```

```text
George Washington

George Washington was unanimously elected as the first President of the United States on April 30, 1789. He took office on the same day and served two terms until March 4, 1797.

Washington was born on February 22, 1732, in Westmoreland County, Virginia. He was a military leader who played a crucial role in the American Revolutionary War and became the founding father of the United States.

As the first President, Washington set many precedents that have been followed by all subsequent presidents. Some of these include the creation of executive departments, the use of a cabinet for advice, and the establishment of a national bank.

Washington is also known for his farewell address in which he warned against the dangers of political factions and foreign entanglements. His two terms in office were marked by a strong emphasis on neutrality, domestic affairs, and economic development.

After leaving office, Washington retired to his estate at Mount Vernon, where he died on December 14, 1799. He is remembered as one of the most important figures in American history and is often referred to as "the Father of His Country."

In conclusion, George Washington was the first President of the United States and set many precedents that have been followed by all subsequent presidents. His leadership during the Revolutionary War and his contributions to the founding of the nation make him an important figure in American history.

The answer is : George Washington
About this answer
George Washington, the first president of US, was unanimously elected on April 30, 1789. He served two terms until March 4, 1797. Born on February 22, 1732, in Westmoreland County, Virginia, he played a crucial role in the American Revolutionary War and became one of the founding fathers of the United States. As the first President, Washington set many precedents that have been followed by all subsequent presidents. His leadership during the Revolutionary War and his contributions to the founding of the nation make him an important figure in American history.

##### 2 Answers

the first president of US is George Washington
The answer is : George Washington
About this answer
George Washington was unanimously elected as the first President of the United States on
```

---

## Problem of Raw Text Generation

- User is hard to interact with model
    - User have to prepare the input as a `part of article`
- Model do not know when to stop the generation

---

## Chat Generation

> Act as the `questioner`/`answerer` in full text

![bg right 75%](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/gty25nx1xw74eepnkrjp)

---

## Chat Generation

> Chat is a `pattern` means

- there has a questioner (human)
- there has a answerer (model)
- each `block` will have a `stop`

> if you think about AST ....

---

Now, we have a model, we have a pattern, it could be interacted convinetly. 

Let's think about generation (level 2)

$$output\_tokens[n] = model.generate(tokens, ...output\_token[0...n-1])$$

---

## Generation (L2) - Nature

- reference `input tokens` and `generted tokens`

it means, to get better performance, you have two options

- provide more input
- let LLM generate more output

---

## Generation (L2) - Chat Template

> chat model is already trained with chats conversations, so for (raw) prompt, you must `indicate` model to fill as `assistant` 


```text
GPT4 Correct User: please give me a joke
```

```text
GPT4 Correct User: please give me a joke
GPT4 Correct Assistant: 
```

---

## Generation (L2) - In fact, if you want, you can indicate more for LLM

> which is not allowed by public LLM generation provider

```text
GPT4 Correct User: give me a joke
GPT4 Correct Assistant: npm is a joke because
```

---

## Geneation (L2) - more token, better performance

- Chain of Thoughts
- Tree of Thoughts

---

## Generation (L2) - Numeric

> in fact LLM treat input tokens discrete values, you cannot imagine how coule it be able to proceed continuous numeric space

> note: language is limited

![bg right 95%](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/emp543wjhcvrdtq195yj)

---

## How to fine tune with model


- model - huggingface
- computing - runpod.io, and more
- dataset - huggingface/self prepration


---

## SFT - Fill with knowledge

for example you want to fill serial documentation into the LLM

- how to [convert CAP relevant articles to a dataset](https://colab.research.google.com/drive/1zGoW5nSMKKECO0wc_U6KBPRW5CE8JAz7?usp=sharing)
- how to [fine tune OpenChat model with 3 CAP datasets, qlora](https://colab.research.google.com/drive/1jor9dFSqb0S-U8Ty03PJrWxaj-HvfJqB?usp=sharing)

---

## SFT - Fine tune with new skill

> you want to enable `function call` feature for the LLM, use SFT to fine tune the model with dataset

- [glaiveai/glaive-function-calling-v2](https://huggingface.co/datasets/glaiveai/glaive-function-calling-v2)
- [Trelis/function_calling_v3](https://huggingface.co/datasets/Trelis/function_calling_v3)

---

## DPO - alignment with AI

> preference, security, compliance

- [orca_dpo_pairs](https://huggingface.co/datasets/Intel/orca_dpo_pairs)

---

## Generation (L3)

if, I say, LLM itself, is a search engine ? 
if, I say, LLM itself, is a pattern matching tool for language ? 

`Attention` give the capability to LLM

- search whole train dataset to get most reasonable next word
- lookup input content

---

## Reference

- [tensor2tensor](https://colab.research.google.com/github/tensorflow/tensor2tensor/blob/master/tensor2tensor/notebooks/hello_t2t.ipynb)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [OpenAI - Tokenizer](https://platform.openai.com/tokenizer)
- [glaiveai/glaive-function-calling-v2](https://huggingface.co/datasets/glaiveai/glaive-function-calling-v2)


---

## Thanks