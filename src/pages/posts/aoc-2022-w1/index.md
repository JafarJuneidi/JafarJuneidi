---
layout: '../../../layouts/BlogPost.astro'
title: 'Advent of Code 2022 - Week 1'
description: 'My solutions to the Advent of Code challenge'
pubDate: 'Dec 9 2022'
---

# what is Advent of Code?

it's an annual set of Christmas-themed computer programming challenges that follow an Advent calendar. [Learn more](https://adventofcode.com/2022/about)

# Motivation

I've been learning rust recently, and I thought this would be a nice opportunity to practice and learn more. And it's been a great experience so far.  
Full code is on my Github.  
Questions could be found on the [Advent of Code website](https://adventofcode.com/2022)

## Day 1

With <mark>include_str!</mark> I embed the input in the binary (I'll be using this a lot throught the following days).
Then I split the input by two new lines <mark>"\n\n"</mark> and map over each split. Then I further split each group into lines, parsing each line then flattening the map and summing the results.  
So now I have transformed each split of <mark>"\n\n"</mark> into a sum of it's lines' parsed digits.
Then I collect the groups into once vector.
I then sort the vector in decreasing order and print the output.

```rust
fn main() {
    let mut output: Vec<usize> = include_str!("./day1.txt")
        .split("\n\n")
        .map(|x| x.lines().flat_map(str::parse::<usize>).sum::<usize>())
        .collect();

    output.sort_by(|a, b| b.cmp(a));

    println!("part1 is :{:?}", output[0]);
    println!("part2 is :{:?}", output.iter().take(3).sum::<usize>());

}
```

## Day 2

credit to [ThePrimeagen](https://twitter.com/ThePrimeagen) for the inspiration.

I created structs for each part of the problem, holding the value desired for each match and implemented <mark>FromSrt</mark> trait on each, so I'm able to parse the input, which is a string slice <mark>&str</mark> into the respective structs.

This code parses the input into a <mark>HandPair1</mark> struct

```rust
const WIN_LOSE: [usize; 3] = [3, 6, 0];

struct HandPair1 {
    value: usize,
}

impl FromStr for HandPair1 {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self> {
        let (o, p) = match s.split_once(" ") {
            Some((o, p)) => (o, p),
            None => return Err(anyhow::anyhow!("invalid input")),
        };

        let o = to_number_1(o);
        let p = to_number_1(p);
        let score = p + WIN_LOSE[(2 + o + p) % WIN_LOSE.len()];

        return Ok(HandPair1 { value: score });
    }
}

fn to_number_1(c: &str) -> usize {
    return match c {
        "A" => 0,
        "B" => 2,
        "C" => 1,
        "X" => 1,
        "Y" => 2,
        "Z" => 3,
        _ => unreachable!("try to get here, lol"),
    };
}
```

This code parses the input into a <mark>HandPair2</mark> struct

```rust
const CHOICE_VALUE: [usize; 3] = [3, 1, 2];

struct HandPair2 {
    value: usize,
}

impl FromStr for HandPair2 {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self> {
        let (o, p) = match s.split_once(" ") {
            Some((o, p)) => (o, p),
            None => return Err(anyhow::anyhow!("invalid input")),
        };

        let o = to_number_2(o);
        let p = to_number_2(p);
        let score = p * 3 + CHOICE_VALUE[(o + p) % CHOICE_VALUE.len()];

        return Ok(HandPair2 { value: score });
    }
}

fn to_number_2(c: &str) -> usize {
    return match c {
        "A" => 0,
        "B" => 1,
        "C" => 2,
        "X" => 0,
        "Y" => 1,
        "Z" => 2,
        _ => unreachable!("try to get here, lol"),
    };
}
```

Here I map through the input, parse it into the necessary struct, map over the result and sum the values.

```rust
fn main() -> Result<()> {
    let values_1: usize = include_str!("./day2.txt")
        .lines()
        .flat_map(|x| x.parse::<HandPair1>())
        .map(|x| x.value)
        .sum();

    let values_2: usize = include_str!("./day2.txt")
        .lines()
        .flat_map(|x| x.parse::<HandPair2>())
        .map(|x| x.value)
        .sum();

    println!("part1 is :{:?}", values_1);
    println!("part2 is :{:?}", values_2);
    Ok(())
}
```

## Day 3

for day 3 I created the following helper function that resturns a 64 bit unsigned int.  
Each bit represents the presence or absence of an english letter at that index.

index 0 represents a  
index 1 represents b  
..etc  
index 27 represents A  
index 28 represents B  
..etc

```rust
fn unique_items(s: &str) -> u64 {
    s.bytes()
        .map(|b| match b {
            b'a'..=b'z' => 1 + b - b'a',
            b'A'..=b'Z' => 27 + b - b'A',
            _ => unreachable!(),
        })
        .fold(0, |acc, b| acc | (1u64 << b))
}
```

Then I simply split the input into lines, and each line into two halves.  
Then I call <mark>unique_items</mark> on each half and <mark>and</mark> them together.
If the same letter exists in both halves, it will result in a 1 at that index.
And that index will be the result which I sum for each lines.

P.S: I used an unstable feature <mark>array_chunks</mark> to split my lines into groups of 3 for part 2. [Learn more](https://doc.rust-lang.org/rustdoc/unstable-features.html)

```rust
#![feature(iter_array_chunks)]
fn main() -> Result<()> {
    let value_1: u32 = include_str!("./day3.txt")
        .lines()
        .map(|x| x.split_at(x.len() / 2))
        .map(|(l, r)| [l, r].map(unique_items))
        .map(|[l, r]| u64::trailing_zeros(l & r))
        .sum();

    let value_2: u32 = include_str!("./day3.txt")
        .lines()
        .array_chunks::<3>()
        .map(|chunk| chunk.map(unique_items))
        .map(|[a, b, c]| a & b & c)
        .map(u64::trailing_zeros)
        .sum();

    println!("part1 is :{:?}", value_1);
    println!("part2 is :{:?}", value_2);
    Ok(())
```

# Day 4

Day 4 was really simple.  
I just split the input and filter lines by <mark>is_contained</mark> or <mark>is_overlapping</mark> and count their number

```rust
fn is_contained(pair: &str) -> bool {
    let result = pair
        .replace("-", ",")
        .split(",")
        .map(|num| num.parse::<u8>().unwrap())
        .collect::<Vec<u8>>();

    let l1 = result[0];
    let r1 = result[1];
    let l2 = result[2];
    let r2 = result[3];

    (l2 >= l1 && r2 <= r1) || (l1 >= l2 && r1 <= r2)
}

fn is_overlapping(pair: &str) -> bool {
    let result = pair
        .replace("-", ",")
        .split(",")
        .map(|num| num.parse::<u8>().unwrap())
        .collect::<Vec<u8>>();

    let l1 = result[0];
    let r1 = result[1];
    let l2 = result[2];
    let r2 = result[3];

    (l2 >= l1 && l2 <= r1)
        || (r2 >= l1 && r2 <= r1)
        || (l1 >= l2 && l1 <= r2)
        || (r1 >= l2 && r1 <= r2)
}

fn main() -> Result<()> {
    let value_1 = include_str!("./day4.txt")
        .lines()
        .filter(|x| is_contained(x))
        .count();

    let value_2 = include_str!("./day4.txt")
        .lines()
        .filter(|x| is_overlapping(x))
        .count();

    println!("part1 is :{:?}", value_1);
    println!("part2 is :{:?}", value_2);
    Ok(())
}
```

## Day 5

For day 5 I first split the input into the initial state, let's call it <mark>start</mark> and <mark>moves</mark>.  
And I created a stack for part 1 and another for part 2.

```rust
    let (start, moves) = include_str!("./day5.txt").split_once("\n\n").unwrap();

    let mut start = start.lines().rev();
    let mut stacks_1: Vec<VecDeque<char>> = start
        .next()
        .unwrap()
        .split_whitespace()
        .map(|_| VecDeque::<char>::new())
        .collect();
    let mut stacks_2 = stacks_1.clone();
```

Then I navigated the <mark>start</mark> split to fill the stacks.

```rust
    start
        .flat_map(|line| {
            line.chars()
                .skip(1)
                .step_by(4)
                .enumerate()
                .filter(|(_, c)| *c != ' ')
                .collect::<Vec<(usize, char)>>()
        })
        .for_each(|(i, c)| {
            stacks_1[i].push_front(c);
            stacks_2[i].push_front(c);
        });
```

After that I mapped over the <mark>moves</mark> and manipulated the stacks according to each move

```rust
    moves
        .lines()
        .map(|line| {
            line.split_whitespace()
                .filter_map(|c| c.parse::<usize>().ok())
                .collect::<Vec<usize>>()
        })
        .map(|line| (line[0], line[1] - 1, line[2] - 1))
        .for_each(|(num, from, to)| {
            let m_1: Vec<char> = (0..num)
                .map(|_| stacks_1[from].pop_front().unwrap())
                .collect();
            m_1.iter().for_each(|c| stacks_1[to].push_front(*c));

            let m_2: Vec<char> = (0..num)
                .map(|_| stacks_2[from].pop_front().unwrap())
                .collect();
            m_2.iter().rev().for_each(|c| stacks_2[to].push_front(*c));
        });
```

## Day 6

Day 6 was a straight forward sliding window problem.  
I created a function that walks over the input with the specified window size using the <mark>position</mark> function,
That returns the index (position) at which the slice satisfies the closure inside the position function.
The closure take a window and loops over the characters in that window and returns false if two similar characters exist,
and true if that window contains no duplicates.

```rust
fn sliding_window(input: &str, win_size: usize) -> usize {
    input
        .as_bytes()
        .windows(win_size)
        .position(|window| {
            let mut data: u32 = 0;
            for &c in window {
                let prev = data;
                data |= 1 << (c - b'a');
                if prev == data {
                    return false;
                }
            }
            return true;
        })
        .unwrap()
        + win_size
}
```

## Day 7

I created a <mark>Dir</mark> struct that hold it's own <mark>size</mark> and a vector of the <mark>entries</mark> inside, which are <mark>Dir</mark>s.
Then I implemented a a recursive <mark>new</mark> function that creates a <mark>Dir</mark> from an iterator on the input slices, and spits out a <mark>Dir</mark>
with it's size and inner <mark>entries</mark> calculated.

I alse implemented the <mark>recurse</mark> function that flattens a <mark>Dir</mark> and it's <mark>entries</mark> so I can map over them easier in the main function.

```rust
struct Dir {
    size: usize,
    entries: Vec<Dir>,
}

impl Dir {
    fn new<'a>(lines: &mut impl Iterator<Item = &'a str>) -> Dir {
        let mut dir = Dir {
            size: 0,
            entries: vec![],
        };

        while let Some(line) = lines.next() {
            if ["$ cd /", "dir", "$ ls"]
                .iter()
                .any(|s| line.starts_with(s))
            {
                continue;
            } else if line == "$ cd .." {
                break;
            }

            if let Ok(size) = line.split_once(' ').unwrap().0.parse::<usize>() {
                dir.size += size;
            } else {
                dir.entries.push(Self::new(lines));
                dir.size += dir.entries.last().unwrap().size;
            }
        }
        dir
    }

    fn recurse(&self) -> Box<dyn Iterator<Item = &Self> + '_> {
        Box::new(std::iter::once(self).chain(self.entries.iter().flat_map(Self::recurse)))
    }
}
```

Here I simply create the root <mark>Dir</mark> from the input and map over the flattened root to calculated the result.

```rust
fn main() -> Result<()> {
    let root = Dir::new(&mut include_str!("./day7.txt").lines());
    let sizes: Vec<usize> = root.recurse().map(|dir| dir.size).collect();
    let required = 30000000 - (70000000 - root.size);

    println!(
        "part1 is :{:?}",
        sizes.iter().filter(|size| **size <= 100000).sum::<usize>()
    );
    println!(
        "part2 is :{:?}",
        sizes
            .iter()
            .filter(|size| **size >= required)
            .min()
            .unwrap()
    );
    Ok(())
}
```
