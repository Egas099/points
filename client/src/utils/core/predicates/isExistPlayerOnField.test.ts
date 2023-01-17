import { isExistPlayerOnField } from './isExistPlayerOnField';

describe('isExistPlayerOnField', () => {
    test('Player exist', () => {
        expect(
            isExistPlayerOnField(
                [
                    [
                        {
                            player: 1
                        }
                    ],
                    [
                        {
                            player: null
                        }
                    ]
                ],
                1
            )
        ).toBe(true);
    });
    test('Player not exist', () => {
        expect(
            isExistPlayerOnField(
                [
                    [
                        {
                            player: null
                        }
                    ],
                    [
                        {
                            player: null
                        }
                    ]
                ],
                1
            )
        ).toBe(false);
    });
});
