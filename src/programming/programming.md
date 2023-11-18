---
marp: true
theme: dark
---

# Programming

Theo Sun
2023

![bg right](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/o5oozohv0fiuwxujgitu)

---

## About this session

To share some ideas about programming itself instead of others (engineering, coding, business)

---

## Etymology of [`Program`](https://en.wiktionary.org/wiki/program#English)

> From French `programme`, from Late Latin `programma` (“a proclamation, edict”), from Ancient Greek `πρόγραμμα` (prógramma, “x”), from `προγράφω` (prográphō, “I set forth as a public notice”), from πρό (pró, “before”) + γράφω (gráphō, “I write”).

![bg right](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/x02owsdgl6oox42jzhl8)


---

## Proposition 1
## Two Paradigms

![bg](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/icl7yu90ouryckrrlla2)

---

### Paradigm 1 (stateful):

![bg right](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/qqitidykafidtdqwfj7c)

```js
// variable/state/database
var a = 1 
add()
add()
console.log(a)
```

---


### Paradigm 2 (stateless):

![bg left](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/yl9jpbmdxdkeida7b7dy)

```js
// in time calculation
var b = add(add(1))
console.log(b)
```

---

### Two Paradigms

![bg right 100%](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/sg2znjatezvlgensnkvh)

The problem is: 

- if use the `stateful` approach, will get bugs
- if use the `stateless` approach, will become unrealistic

---

### Two Paradigms - Situation

- Most people never think about this yet.
- Unintentionally mixed those two approaches everywhere.

---

### Two Paradigms - Inference

- the less external state operations, the less bugs
- modern computer programming itself is a risky activity - efficiency first

---

![bg](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/fgfdxutaqkvwolt9qsof)

## Proposition 2

## The limits of my language mean the limits of my world.

---
 
### The limits of my language mean the limits of my world.

```go
// SumInts adds together the values of m.
func SumInts(m map[string]int64) int64 {
    var s int64
    for _, v := range m {
        s += v
    }
    return s
}

// SumFloats adds together the values of m.
func SumFloats(m map[string]float64) float64 {
    var s float64
    for _, v := range m {
        s += v
    }
    return s
}
```

---

### The limits of my language mean the limits of my world.

```js
fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    // Q: how to perform a task after all gm operations done ?
    files.forEach(function (filename, fileIndex) {
      console.log(filename)
      gm(source + filename).size(function (err, values) {
        if (err) {
          console.log('Error identifying file size: ' + err)
        } else {
          console.log(filename + ' : ' + values)
          aspect = (values.width / values.height)
          widths.forEach(function (width, widthIndex) {
            height = Math.round(width / aspect)
            console.log('resizing ' + filename + 'to ' + height + 'x' + height)
            this.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
              if (err) console.log('Error writing file: ' + err)
            })
          }.bind(this))
        }
      })
    })
  }
})
```


---

### Programming languages shape the way you think


```python
# using with statement
with open('file_path', 'w') as file:
    file.write('hello world !')
```

```go
func main() {
    file, err := os.Open( "test.txt" )
    if err != nil {
        log.Println(err)
        return
    }
    defer file.Close()
    // .... file operations
}
```

---

### Programming languages shape the way you think

> In Golang, launching thousands of rockets and ensuring they all hit their targets is a breeze.

```go
var wg sync.WaitGroup

func hello(i int) {
    defer wg.Done()
    fmt.Println("Hello Goroutine!", i)
}

func main() {
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go hello(i)
    }
    wg.Wait()
}
```

---

### Programming languages shape the way you think

> its possible we build a programming language without `loop`

```csharp
using System.Numerics;

dynamic[] peoples = {
  new {
    FirstName = stringToVector("John"),
    LastName = stringToVector("Doe")
  },
  new {
    FirstName = stringToVector("Jain"),
    LastName = stringToVector("Smith")
  },
  new {
    FirstName = stringToVector("Theo"),
    LastName = stringToVector("Sun")
  },
  new {
    FirstName = stringToVector("People"),
    LastName = stringToVector("Joe")
  }
};

var ages = new Vector<double>[] {
  doubleToVector(32),
  doubleToVector(25),
  doubleToVector(27),
  doubleToVector(43)
};

var oldestPeople = peoples[Vector.MaxIndex(ages)];
```
---

### Programming languages shape the way you think

> In java, everything is about `class` & `object`

```java
@FunctionalInterface
interface Square {
	int calculate(int x);
}

// --- 
class Test {
	public static void main(String args[])
	{
		int a = 5;

		// lambda expression to define the calculate method
		Square s = (int x) -> x * x;

		// parameter passed and return type must be
		// same as defined in the prototype
		int ans = s.calculate(a);
		System.out.println(ans);
	}
}

```

---

### Programming languages shape the way you think

> YES, structured query language, totally different way to think 

```sql
SELECT 1;
```
---

### The limits of my language mean the limits of my world.

- What can be said at all can be said clearly, and whereof one cannot speak thereof one must be silent.
- Programming languages shape the way you think.
- Each language possesses its unique methodology.

![bg right](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/chxamutn0carqa4hsbre)


---

## Proposition 3

## Programming, itself, is a kind of methodology, means reusable and modifiable

![bg](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/dfieekbcsu8lbk2iqs0d)

---

### means, you can `program` anything, and use `anything` to program

---

### Programming could be applied to more scenarios

- Hardware/CPU/GPU - FPGA
- Radio - Software-defined radio
- Network - Software defined network
- Infrastructure - terraform - Infrastructure as code
- Stock - Quantitative trading
- Quantum - Quantum computing
- Program - Meta Programming/Compiler

---

### Programming principles/methodology could be applied to more scenarios

- Cognitive Load
- Immutability
- Design by Contract
- Reflect
- Open/Closed Principle
- Single Responsibility Principle

