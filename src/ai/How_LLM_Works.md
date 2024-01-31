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

$$output\_tokens[n] = model.generate(tokens + output\_token[0...n-1])$$

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

Now, we have a model, we have a pattern, it could be interacted convinetly, let's think about content.

---

## Embedding

---

### Self Attention

---

### Auto Regression

---

### Positional Encoding

---

## How to fine tune with model

---

## Reference

- [tensor2tensor](https://colab.research.google.com/github/tensorflow/tensor2tensor/blob/master/tensor2tensor/notebooks/hello_t2t.ipynb)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [OpenAI - Tokenizer](https://platform.openai.com/tokenizer)


---

## Thanks