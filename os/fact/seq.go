package main

import (
    "fmt"
    "math/big"
    "time"
)

func factorial(n int64) *big.Int {
    fact := big.NewInt(1)
    for i := int64(2); i <= n; i++ {
        fact.Mul(fact, big.NewInt(i))
    }
    return fact
}

const num = 923

func main() {
    start := time.Now()

    results := make([]*big.Int, num)
    for i := int64(1); i <= num; i++ {
        results[i-1] = factorial(i)
    }

    // fmt.Println("Results:", results)
    fmt.Println("Time taken:", time.Since(start))
}