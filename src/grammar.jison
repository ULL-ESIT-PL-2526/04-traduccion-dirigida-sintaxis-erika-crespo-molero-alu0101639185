/* Lexer */
%lex
%%
\/\/[^\n]*            { /* skip single-line comment */ }
\s+                   { /* skip whitespace */ }
[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?  { return 'NUMBER'; }
"**"                  { return '**'; }   // operador potencia
"+"                   { return '+'; }
"-"                   { return '-'; }
"*"                   { return '*'; }
"/"                   { return '/'; }
<<EOF>>               { return 'EOF'; }
.                     { return 'INVALID'; }
/lex

/* Precedencia y asociatividad */
%left '+' '-'
%left '*' '/'
%right '**'

/* Parser */
%start expressions
%%

expressions
    : expression EOF
        { return $1; }
    ;

expression
    : expression '+' term
        { $$ = operate('+', $1, $3); }
    | expression '-' term
        { $$ = operate('-', $1, $3); }
    | term
        { $$ = $1; }
    ;

term
    : term '*' factor
        { $$ = operate('*', $1, $3); }
    | term '/' factor
        { $$ = operate('/', $1, $3); }
    | factor
        { $$ = $1; }
    ;

factor
    : primary '**' factor
        { $$ = operate('**', $1, $3); }
    | primary
        { $$ = $1; }
    ;

primary
    : NUMBER
        { $$ = Number(yytext); }
    ;
%%

function operate(op, left, right) {
    switch (op) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/': return left / right;
        case '**': return Math.pow(left, right);
    }
}