# Extracting Data:

1. Pull transactions [Goldsky](https://arweave-search.goldsky.com/graphql)
2. Download their content [Arweave -https://arweave.net/${tx}](https://arweave.net/)
3. Determine type for later steps ( JSON?, Webpage, Social, Image, Video ) _**LLama 2**_

# Enriching Data:

1. Cleaning - Misspellings and Other Errors _**LLama 2**_ or _**Dictionary**_
2. Augment - Determining sentiment ( Positive, Negative, Neutral ) _**LLama 2**_
3. External Sources - Fill in extra data. _**LLama 2**_

# Analysis

1. Character Filtering
   - [HTMLStripCharFilter](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-htmlstrip-charfilter.html)
   - [Mapping ( Maybe useful to map custom words: Arweave, Crypto, etc. )](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-mapping-charfilter.html)
   - [Pattern Replace ( Not sure of use case yet )](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-pattern-replace-charfilter.html)
2. Tokenization
   - [Standard](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-standard-tokenizer.html)
   - [Whitespace](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-whitespace-tokenizer.html)
3. Token Filtering
   - [ASCII Folding](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-asciifolding-tokenfilter.html)
   - [Classic](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-classic-tokenfilter.html)
   - [Stop](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-stop-tokenfilter.html)
   - [Lowercase](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lowercase-tokenfilter.html)
   - [Porter Stemmer - Aggressive ](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-porterstem-tokenfilter.html)
   - [Stemmer - Defaults To Porter Stemmer](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-stemmer-tokenfilter.html)
   - [K Stemmer - Less Aggressive ](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-kstem-tokenfilter.html)
   - [Pattern Capture - For Preserving IDS](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-pattern-capture-tokenfilter.html)
4. Indexing
   - Fields to index - _Indexing refers to the process of updating the inverted index with the extracted
     tokens to enable search on that field_
   - Fields to store - _Storing refers to retaining the original, unaltered document content in the stored
     field’s data structure so that it can be retrieved and presented to the user in search results_
   - Data structures to use - _More Reading Required_

# Extra Token Filters

- [MinHash ( The min_hash token filter allows you to hash documents for similarity search )](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-minhash-tokenfilter.html#analysis-minhash-tokenfilter-similarity-search)
- [Multiplexer (Allows you to run each token thru a separate process)](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-multiplexer-tokenfilter.html)
- [N-Gram ( Search as you type )](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-ngram-tokenfilter.html)
- [Edge N-Gram ( Search as you type )](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-edgengram-tokenfilter.html)
- [Shingle ( May be useful for creating phrases )](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-shingle-tokenfilter.html)
- [Trim ( Removes leading and trailing whitespace ) **_Built In To Standard and Whitespace Tokenizers_**](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-trim-tokenfilter.html)
- [Word Delimiter Graph](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-word-delimiter-graph-tokenfilter.html)
