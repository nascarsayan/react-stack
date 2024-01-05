package main

import (
    "fmt"
    "math/big"
    "time"
)

const num = 923

func factorial(n int64, ch chan *big.Int) {
    fact := big.NewInt(1)
    for i := int64(2); i <= n; i++ {
        fact.Mul(fact, big.NewInt(i))
    }
    ch <- fact
}

func main() {
    start := time.Now()

    ch := make(chan *big.Int)
    for i := int64(1); i <= num; i++ {
        go factorial(i, ch)
    }

    results := make([]*big.Int, num)
    for i := range results {
        results[i] = <-ch
    }

    // fmt.Println("Results:", results)
    fmt.Println("Time taken:", time.Since(start))
}
