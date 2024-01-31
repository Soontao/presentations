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

![bg right 85%](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/iclmedfdw7rdrxjvzosw)

$$next\_token = f(tokens)$$

---

## Text Generation

> original, the task for LLM is [`completion`](https://huggingface.co/bigscience/bloom)

![bg right 75%](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/mjcjtdhjaxvatcnqdzex)

---

## Text Generation

> Pattern Apply

![bg right 80%](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/isg2eupysozg20qrb9yr)

---

## Text Generation

> There is no interaction between YOU and AI, its just try to `complete` 

![bg right 80%](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/rbjn4p072xlnhildctgu)

---

## Text Generation

![bg right 80%](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/m4owv2lnptchcs3iwp1c)

---

## Prompt Template

> Act as the `user` in full text

![bg right 80%](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/gty25nx1xw74eepnkrjp)

---

## Tokenizer

---

## Embedding

---

## Generation

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

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)


---

## Thanks