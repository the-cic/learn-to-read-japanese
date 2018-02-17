'use strict';

angular.module('testView', ['data'])
        .controller('TestViewCtrl', function ($scope, HiraganaMap, TableFromMap) {

            var self = this;
            var CASUAL = 'casual';
            var TEST = 'test';

            $scope.content = {
                question: '',
                answer: '',
                showing: {
                    question: false,
                    answer: false,
                    result: false
                },
                mode: TEST,
                include: {
                    base: true,
                    extended: true,
                    combined: true,
                    misses: true
                },
                test: {
                    total: 0,
                    correct: 0,
                    remaining: 0,
                    attempts: 0
                }
            };

            $scope.showSetup = function () {
                $scope.content.showing.question = false;
                $scope.content.showing.result = false;
            };

            $scope.startTest = function (mode) {
                if (!$scope.content.include.base && !$scope.content.include.extended && !$scope.content.include.combined) {
                    return;
                }
                $scope.content.mode = mode;
                self.compileTable();
                $scope.content.showing.question = true;
                $scope.content.showing.answer = false;
                $scope.content.showing.result = false;
                self.nextQuestion();
                if ($scope.content.mode === TEST) {
                    $scope.content.test.total = self.testTable.length;
                    $scope.content.test.correct = 0;
                    $scope.content.test.attempts = 0;
                    $scope.content.test.remaining = self.testTable.length;
                }
            };

            $scope.showAnswer = function () {
                $scope.content.showing.answer = true;
            };

            $scope.showNextQuestion = function (correct) {
                if ($scope.content.mode === TEST) {
                    $scope.content.test.attempts++;
                    if (correct) {
                        $scope.content.test.correct++;
                    }
                    if (correct || !$scope.content.include.misses) {
                        self.removeCurrentFromTest();
                    }
                }
                if (self.hasMoreQuestions()) {
                    $scope.content.showing.answer = false;
                    self.nextQuestion();
                } else {
                    self.showFinish();
                }
            };

            self.showFinish = function () {
                $scope.content.showing.result = true;
            };

            self.hiraganaTable = {
                base: TableFromMap(HiraganaMap.base),
                extended: TableFromMap(HiraganaMap.extended),
                combined: TableFromMap(HiraganaMap.combined)
            };

            self.testTable = [];
            self.testIndex;

            self.compileTable = function () {
                var table = [];
                if ($scope.content.include.base) {
                    table.push.apply(table, self.hiraganaTable.base);
                }
                if ($scope.content.include.extended) {
                    table.push.apply(table, self.hiraganaTable.extended);
                }
                if ($scope.content.include.combined) {
                    table.push.apply(table, self.hiraganaTable.combined);
                }
                self.testTable = table;
            };

            self.nextQuestion = function () {
                var index = Math.floor(Math.random() * self.testTable.length);
//                console.log("Selecting #" + index + " from " + self.testTable.length);
                var item = self.testTable[index];
                self.testIndex = index;
                $scope.content.question = item.q;
                $scope.content.answer = item.a;
            };

            self.removeCurrentFromTest = function () {
                self.testTable.splice(self.testIndex, 1);
                $scope.content.test.remaining = self.testTable.length;
            };

            self.hasMoreQuestions = function () {
                return self.testTable.length > 0;
            };

        });
